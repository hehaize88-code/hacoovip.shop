<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
header('X-Robots-Tag: noindex, nofollow');

function send_json($status, array $payload)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function class_xpath($class)
{
    return "contains(concat(' ', normalize-space(@class), ' '), ' {$class} ')";
}

function absolute_main_url($value, $allowedPrefix)
{
    $value = trim($value);
    if (strpos($value, $allowedPrefix) !== 0) {
        return '';
    }
    return 'https://www.cnfanshp.com' . $value;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    send_json(405, ['error' => 'Method not allowed']);
}

$query = trim((string)($_GET['q'] ?? ''));
$length = function_exists('mb_strlen') ? mb_strlen($query, 'UTF-8') : strlen($query);

if ($length < 2 || $length > 80) {
    send_json(400, ['error' => 'Enter between 2 and 80 characters']);
}

$cacheDirectory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'hacoo-search-cache';
$cacheFile = $cacheDirectory . DIRECTORY_SEPARATOR . hash('sha256', strtolower($query)) . '.json';

if (is_readable($cacheFile) && (time() - (int)filemtime($cacheFile)) < 300) {
    $cached = file_get_contents($cacheFile);
    if (is_string($cached) && $cached !== '') {
        header('X-Search-Cache: HIT');
        echo $cached;
        exit;
    }
}

$sourceUrl = 'https://www.cnfanshp.com/search.html?keywords=' . rawurlencode($query) . '&channelid=2';
$html = '';

if (function_exists('curl_init')) {
    $curl = curl_init($sourceUrl);
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_MAXREDIRS => 2,
        CURLOPT_USERAGENT => 'HacooStoreSearch/1.0',
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_HTTPHEADER => ['Accept: text/html,application/xhtml+xml'],
    ]);
    $response = curl_exec($curl);
    $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if (is_string($response) && $status >= 200 && $status < 300) {
        $html = $response;
    }
} elseif ((bool)ini_get('allow_url_fopen')) {
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 12,
            'header' => "Accept: text/html,application/xhtml+xml\r\nUser-Agent: HacooStoreSearch/1.0\r\n",
        ],
    ]);
    $response = @file_get_contents($sourceUrl, false, $context);
    if (is_string($response)) {
        $html = $response;
    }
}

if ($html === '') {
    send_json(502, ['error' => 'Product search is temporarily unavailable']);
}

if (!class_exists('DOMDocument')) {
    send_json(500, ['error' => 'DOM extension is required']);
}

libxml_use_internal_errors(true);
$document = new DOMDocument();
$loaded = $document->loadHTML($html, LIBXML_NOERROR | LIBXML_NOWARNING);
libxml_clear_errors();

if (!$loaded) {
    send_json(502, ['error' => 'Unable to read search results']);
}

$xpath = new DOMXPath($document);
$cards = $xpath->query('//div[' . class_xpath('product-card') . ']');
$items = [];

if ($cards !== false) {
    foreach ($cards as $card) {
        if (count($items) >= 6) {
            break;
        }

        $titleNodes = $xpath->query('.//h3[' . class_xpath('product-name') . ']', $card);
        $linkNodes = $xpath->query('.//a[' . class_xpath('product-image') . '][@href]', $card);
        $imageNodes = $xpath->query('.//img[@data-src or @src]', $card);
        $priceNodes = $xpath->query('.//div[' . class_xpath('product-price') . ']', $card);

        $titleNode = $titleNodes !== false ? $titleNodes->item(0) : null;
        $linkNode = $linkNodes !== false ? $linkNodes->item(0) : null;
        $imageNode = $imageNodes !== false ? $imageNodes->item(0) : null;
        $priceNode = $priceNodes !== false ? $priceNodes->item(0) : null;

        if (!$titleNode || !$linkNode || !$imageNode) {
            continue;
        }

        $title = trim(preg_replace('/\s+/u', ' ', $titleNode->textContent) ?? '');
        $productUrl = absolute_main_url($linkNode->getAttribute('href'), '/AllProducts/');
        $imagePath = $imageNode->getAttribute('data-src') ?: $imageNode->getAttribute('src');
        $imageUrl = absolute_main_url($imagePath, '/uploads/');

        if ($title === '' || $productUrl === '' || $imageUrl === '') {
            continue;
        }

        $items[] = [
            'title' => $title,
            'url' => $productUrl,
            'image' => $imageUrl,
            'price' => $priceNode ? trim($priceNode->textContent) : '',
        ];
    }
}

$payload = [
    'query' => $query,
    'items' => $items,
];
$json = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

if (!is_dir($cacheDirectory)) {
    @mkdir($cacheDirectory, 0700, true);
}
if (is_dir($cacheDirectory) && is_string($json)) {
    @file_put_contents($cacheFile, $json, LOCK_EX);
}

header('X-Search-Cache: MISS');
echo $json;
