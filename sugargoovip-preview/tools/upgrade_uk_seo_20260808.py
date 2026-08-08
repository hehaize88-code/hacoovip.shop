from __future__ import annotations

import hashlib
import html
import json
import re
import sys
from io import BytesIO
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from PIL import Image

BASE = Path(__file__).resolve().parents[1]
SITE = "https://sugargoovip.uk"
MAIN = "https://www.cnfanshp.com"
TODAY = "2026-08-08"
UA = "Mozilla/5.0 (compatible; SugargooVIPCatalogAudit/1.0; +https://sugargoovip.uk/)"

CATEGORIES = {
    "shoes": {"name": "Shoes", "main": "/shoes/", "focus": "size labels, pair consistency, sole shape, visible stitching and measurements when fit is critical"},
    "hoodies-sweaters": {"name": "Hoodies & Sweaters", "main": "/hoodies-sweaters/", "focus": "size-chart matching, chest and length measurements, colour, print or embroidery placement and visible seams"},
    "t-shirts": {"name": "T-Shirts", "main": "/t-shirts/", "focus": "size selection, chest width, total length, print placement, collar construction and visible fabric condition"},
    "jackets": {"name": "Jackets", "main": "/jackets/", "focus": "outer dimensions, lining or insulation option, zips, pockets, hardware, colour blocking and visible construction"},
    "pants-shorts": {"name": "Pants & Shorts", "main": "/pants-shorts/", "focus": "waist, rise, inseam, leg opening, selected wash or colour and visible seams or hardware"},
    "headwear": {"name": "Headwear", "main": "/headwear/", "focus": "circumference or size option, brim or crown shape, embroidery placement, closures and visible deformation"},
    "accessories": {"name": "Accessories", "main": "/accessories/", "focus": "dimensions, included pieces, closures, hardware, model compatibility and any category-specific shipping attribute"},
    "electronics": {"name": "Electronics", "main": "/electronics/", "focus": "model label, plug or connector type, included accessories, visible condition and route eligibility for batteries or other restricted attributes"},
}

OFFICIAL_SOURCES = {
    "workflow": "https://blog.sugargoo.com/features/",
    "qc": "https://blog.sugargoo.com/sugargoo-qc-service-quality-check-guide/",
    "storage": "https://blog.sugargoo.com/how-long-does-sugargoo-keep-items-in-the-warehouse/",
    "returns": "https://blog.sugargoo.com/sugargoo-returns-refunds-guide/",
    "calculator": "https://blog.sugargoo.com/sugargoo-freight-calculator/",
    "shipping": "https://blog.sugargoo.com/estimate-international-shipping-costs-sugargoo/",
    "govuk": "https://www.gov.uk/goods-sent-from-abroad/overview",
    "govuk_tax": "https://www.gov.uk/goods-sent-from-abroad/tax-and-duty",
}

WAREHOUSE_BODY = r'''
<p>A Sugargoo warehouse guide is useful only if it helps a buyer make decisions between “the seller has shipped” and “the international parcel is ready to leave China.” Those are different stages. A product can be paid for but not yet received, received but not yet inspected, inspected but waiting for another item, or ready to be included in a parcel. For UK shoppers, keeping those stages separate matters because the cost and risk of fixing a problem usually increase once the parcel leaves the Chinese warehouse.</p>
<p>Sugargoo’s official material describes a workflow in which a Chinese seller sends the product to the Sugargoo warehouse, the warehouse performs a quality check, and the buyer later selects items in the Packing Center to submit an international parcel. The official QC FAQ also states that shopping-agent orders receive five free QC photos per item and that a final packed parcel includes one free parcel photo. These are useful checkpoints, but they should not be treated as proof of materials, authenticity, comfort, durability or anything that cannot be established from the visible evidence.</p>
<h2>1. Match the warehouse arrival to the order you actually placed</h2>
<p>Start with identity, not with whether the photo “looks good.” Compare the warehouse record with the original product link, the exact variant text, colour, size, model, quantity and any seller note saved when the order was submitted. If the listing has changed since purchase, your own order record becomes important because a current page may no longer show the option you selected. A screenshot or copied option name taken at checkout is often more useful than relying on memory.</p>
<p>For a multi-item order, assign a simple item ID before purchase and keep that ID next to the product link and warehouse entry. This prevents the common situation where two black shirts or two similar pairs of shoes are confused because the discussion uses phrases such as “the second one” or “the one above.” The purpose is not to build a complicated database; it is to make each warehouse item traceable to one clear decision.</p>
<h2>2. Read QC photos as evidence, not as a guarantee</h2>
<p>Sugargoo’s official QC guide says the warehouse checks shopping-agent orders and provides five free QC photos per item. The guide also explains that buyers can use a personalised photography add-on when they need specific close-ups or measurements, and says unclear free QC photos can be raised with customer service for a retake. That gives buyers a practical way to ask better questions before shipping.</p>
<p>Review the photos in layers. First confirm the whole item: colour family, silhouette, visible size label and included pieces. Then inspect the details that matter for the category. Clothing may require seams, print placement, labels and measurements. Shoes may require size tags, left/right consistency, sole shape and visible glue or stitching. Bags may require closures, straps, hardware and dimensions. Electronics require model labels, plug type and visible accessories, but a photo still cannot establish electrical performance unless a relevant test is actually offered and recorded.</p>
<h2>3. Decide when extra photos or measurements are worth requesting</h2>
<p>Extra photography is most useful when it resolves a decision. Asking for ten random close-ups creates more images without necessarily reducing uncertainty. A better request names the area and the reason: “measure the insole from heel to toe,” “show the model label next to the plug,” or “photograph the corner where the main image appears creased.” Specific requests are easier for warehouse staff to execute and easier for you to compare with the seller’s description.</p>
<p>Measurements are particularly valuable when the seller’s size chart is the reason you chose a variant. A label marked L does not prove a garment will match another brand’s L. If fit matters, save the seller chart and compare the warehouse measurement with the dimension that drove the choice. Treat small measurement differences sensibly: the objective is to catch a clearly wrong selection, not to imply laboratory precision from a manual tape measure.</p>
<h2>4. Use the storage window as a planning limit, not a target</h2>
<p>Sugargoo has published an official warehouse-storage guide stating that purchasing orders receive a 100-day free-storage period and forwarding or resell orders a 30-day free-storage period, with extensions discussed in the same guide. Because policies can change, check the current order or warehouse page before relying on those numbers for a live parcel. The safe planning principle is more durable: note the earliest storage deadline among the items you intend to combine.</p>
<p>Do not wait until the last day to make a parcel decision. One item may arrive early while another seller is still processing an order, and a return or exchange can consume additional time. A simple warehouse sheet with arrival date, QC status, return status and storage deadline makes it obvious which item is driving the schedule. UK shoppers building a larger haul should review this sheet every time a new item arrives instead of assuming all products share the same clock.</p>
<h2>5. Handle returns while the item is still in the domestic stage</h2>
<p>Sugargoo’s official returns material emphasizes the advantage of identifying a problem while goods are still in China, before international shipping. The exact seller rules and after-sales windows can vary by marketplace, seller and order, so a general guide should not promise a universal return period. What you can control is the speed of your own review. Open QC photos soon after they appear, document the issue and use the current order interface to see which options are available.</p>
<p>Keep the evidence objective. “I do not like it” may be a different type of request from “the received colour does not match the ordered option” or “the item arrived with a visible defect.” Save the relevant order specification and photo. If a seller page or platform rule has changed, the evidence attached to the actual order is more useful than an old community post.</p>
<h2>6. Choose between consolidation and splitting based on parcel facts</h2>
<p>Sugargoo’s official workflow describes selecting items in the Packing Center and combining multiple orders into an international shipment. Consolidation can reduce duplicated outer packaging, but a single large parcel is not automatically better. Route eligibility, dimensional weight, fragile items, restricted attributes, urgency and the value of separating risk can all affect the decision. Compare the available options after the warehouse has reliable weights and dimensions.</p>
<p>For UK delivery, treat the shipping calculator and the actual parcel-submission screen as the current source for available routes. A route mentioned in an older article may no longer appear for your postcode, product type or parcel size. If one item changes the available route for the entire parcel, test the cost and eligibility both with and without it. That is more informative than copying the cost per kilogram from somebody else’s haul.</p>
<h2>7. Inspect packing decisions before paying international shipping</h2>
<p>The final parcel photo is a useful last checkpoint. Compare the submitted item list with what you intended to include. Confirm the delivery address, parcel count, chosen packaging services and any removal instructions before payment. If you asked to remove shoe boxes or other retail packaging, remember that reducing volume can also reduce protection; choose based on the item rather than applying one rule to every parcel.</p>
<p>For fragile or shape-sensitive goods, protection can be more important than achieving the smallest possible volume. For soft clothing, compression may be reasonable if the route and service allow it. Keep a copy of the parcel number, route name, declaration information and tracking number after submission. These records help distinguish warehouse processing from carrier movement later.</p>
<h2>8. What UK shoppers should verify outside the warehouse</h2>
<p>The warehouse can help establish what was received and how it was packed, but it does not decide UK customs law. GOV.UK states that goods sent from abroad pass through customs and that VAT, Customs Duty or other charges can apply depending on the type and value of the goods and the destination within the UK. Rules can change, so check the current government guidance rather than relying on a spreadsheet, agent forum or old shipping screenshot.</p>
<p>Accurate product descriptions and values matter. Do not treat a shipping route name as a promise that no tax, customs review or delivery charge can occur. The carrier or parcel company manages the customs handoff and may contact the recipient if money or information is required.</p>
<h2>9. A practical pre-parcel checklist</h2>
<ul><li>Every warehouse item is matched to the correct product link and approved variant.</li><li>QC photos have been reviewed for category-specific visible issues.</li><li>Extra photos or measurements were requested only where they can change a decision.</li><li>Any return or exchange question has been raised before international submission.</li><li>Storage deadlines are recorded and the earliest deadline is driving the schedule.</li><li>The planned parcel has been tested for route eligibility, weight and volume.</li><li>Fragile, restricted or unusual items have been considered separately.</li><li>The delivery address, declaration, parcel contents and packing instructions are checked.</li><li>The buyer has read current UK customs and tax guidance for goods sent from abroad.</li></ul>
<h2>10. The warehouse stage is where uncertainty is cheapest to reduce</h2>
<p>The most valuable warehouse habit is to turn each status update into a decision. An arrival should trigger an identity check. QC photos should trigger a visible-condition check. A storage warning should trigger a timing decision. A parcel estimate should trigger a route and packing comparison. When these decisions are made before international shipping, problems are easier to document and usually easier to address.</p>
<p>This guide is independent and does not operate Sugargoo or process orders. Official Sugargoo pages were checked on 8 August 2026 for the warehouse, QC, packing and storage workflow. Current account rules, route availability, storage periods and after-sales options should always be verified in the live Sugargoo interface before acting.</p>
'''

QC_BODY = r'''
<p>QC photos are most useful when they answer a specific question: did the warehouse receive the item and variant you intended to buy, and is there any visible reason to pause before international shipping? They are not a substitute for the original product listing, a material laboratory test or a long-term product review. A good Sugargoo QC process connects three pieces of evidence—the order specification, the warehouse images and the decision you make before parcel submission.</p>
<p>Sugargoo’s official QC FAQ, checked on 8 August 2026, states that shopping-agent orders receive five free QC photos per item after the item is delivered to and signed in at the warehouse. It also states that a final packed parcel includes one free parcel photo, that personalised photography can be purchased for extra close-ups or detailed requests, and that unclear free QC or parcel photos can be raised with customer service for a retake. Those are useful tools when they are used deliberately.</p>
<h2>1. Start with the order record, not the first photo</h2><p>Before looking for defects, confirm what you actually ordered. Open the saved product link or your checkout record and write down the exact colour, size, model, quantity and any option text. If the seller page has changed or disappeared, use the screenshot or note saved when the order was placed. This avoids judging the item against a different version that happens to be visible today.</p><p>For products with similar variants, save the original option text even if it is in Chinese. A translation can help you understand it, but the original wording is the safest reference when a page has several nearly identical choices. The goal is to answer “does this warehouse item correspond to the order?” before asking “do I like how it looks?”</p>
<h2>2. Use the first pass to confirm identity</h2><p>On the first pass, ignore tiny details. Check the overall silhouette, main colour, visible size or model label, number of pieces and obvious accessories. A sweatshirt ordered in black should not arrive navy; a pair of shoes should show the expected size label; a bag set should include the pieces promised in the selected option. If the basic identity is wrong, there is little value in spending time on fine stitching.</p><p>When colour is important, remember that warehouse lighting, camera exposure and your own screen can shift how a shade appears. Compare distinctive design elements and labels as well as colour. If the exact shade is critical, request a clear photo under standard lighting rather than assuming a single image proves the colour is wrong.</p>
<h2>3. Clothing QC: focus on the details that affect the order</h2><p>For clothing, inspect the front, back and sides, then zoom in on seams, printed areas, embroidery, zippers, buttons and labels that are visible in the supplied images. Look for large stains, tears, missing hardware, obvious asymmetric construction and whether the selected colour and style match the order. Do not turn QC into a claim that the garment is authentic or made from a particular fibre unless the evidence actually establishes that fact.</p><p>Fit is a separate problem. The tag may show the ordered size but still not tell you whether the garment will fit the buyer. If fit matters, compare the seller’s size chart with a requested measurement. A chest width, total length or waist measurement can be more useful than several extra beauty shots. Record how the measurement was taken because different measurement methods produce different numbers.</p>
<h2>4. Shoes QC: size, pair consistency and visible construction</h2><p>For shoes, first confirm the size marking and that both shoes form a consistent pair. Compare the toe shape, heel height, sole pattern, colour blocking and visible accessories with the listing reference. Check for large glue marks, obvious separation, heavy creasing, damaged eyelets or mismatched left and right details where the standard photos show them.</p><p>If the buyer selected the size based on insole length or foot length, an extra measurement can be more valuable than a logo close-up. Ask for the measurement in a way that can be repeated, for example “measure the removable insole from the back of the heel to the longest point.” If the insole cannot be removed, ask what measurement is actually available rather than assuming.</p>
<h2>5. Bags and accessories: hardware and dimensions matter</h2><p>For bags, verify straps, detachable pieces, closures and hardware included in the selected option. Check visible corners and edges for major deformation or damage. A bag that looks correct from the front may still have a missing shoulder strap or the wrong size. If dimensions are important, request a length, height and depth measurement and compare them with the source listing.</p><p>For jewellery, watches or small accessories, standard wide-angle photos may not show the detail you care about. Personalised photography is useful when you can name the exact area: clasp, engraving, face, connector or included accessory. Avoid asking the warehouse to judge subjective quality; ask them to show the evidence you need to judge it yourself.</p>
<h2>6. Electronics: visible QC has strict limits</h2><p>For electronics, confirm the visible model identifier, plug or connector, colour, included cables and any label shown on the product or box. These checks can catch an obviously wrong version. They cannot prove battery health, internal components, wireless compatibility, software condition or long-term reliability unless an offered test actually covers those points.</p><p>Shipping eligibility is also separate from product identity. Batteries, liquids and other attributes can affect which international routes are available. Do not wait until after every item has been combined to discover that one product changes the route options. Record relevant attributes early and check the live shipping interface for your destination.</p>
<h2>7. When to request extra photos</h2><p>Use extra photos when the standard set leaves a decision unresolved. A good request contains one subject and one purpose: “show the size label next to the shoe,” “photograph the damaged corner from 20 cm away,” or “measure the chest width flat from armpit to armpit.” This is more useful than “please take more photos,” which may simply produce different angles of the same information.</p><p>Sugargoo’s official QC FAQ describes personalised photography as an option for extra QC images, close-ups or high-resolution shots. The same FAQ says unclear free QC photos or the free parcel photo can be reported to customer service for a retake. Check the live service page for current pricing and ordering steps rather than copying an old fee from a forum.</p>
<h2>8. Turn QC into one of three decisions</h2><p>A QC review should end with a decision: proceed, pause for more evidence, or use the available after-sales process. “Proceed” means the visible evidence is consistent enough with the order for you to accept the remaining uncertainty. “Pause” means a specific photo, measurement or clarification can resolve the question. “After-sales” means you have a documented mismatch or visible issue and should check the current order options before international shipment.</p><p>Do not confuse “I cannot see a problem” with “there is no problem.” Standard photos have limits. The job of QC is to reduce avoidable errors before shipping, not to create certainty that the photos cannot support.</p>
<h2>9. Review returns before the parcel leaves China</h2><p>Sugargoo’s official returns material emphasizes resolving eligible problems while the item is still in the domestic stage. Seller rules and return windows vary, so review the live order page as soon as an issue is identified. Save the order specification, the relevant QC photo and a short factual description of the mismatch.</p><p>This is also the time to decide whether a replacement is acceptable. A replacement can restart the domestic shipping and QC cycle, so it may affect the schedule of a larger haul. Track it separately instead of assuming the original arrival date still applies.</p>
<h2>10. Check the final parcel, not just individual items</h2><p>Individual QC does not replace a final parcel check. The official QC FAQ says a completed parcel includes one free parcel photo. Use it to confirm the package state and compare the submitted item list with your plan. If you removed retail boxes or requested special packing, check that the final setup is consistent with your instructions.</p><p>Before paying international shipping, also verify the address, route, declaration details, insurance or value-added services you selected and the current parcel weight or dimensions. QC tells you about the goods; parcel submission tells you how those goods are about to travel.</p>
<h2>11. UK buyers should keep QC and customs separate</h2><p>QC is a warehouse inspection process. It does not determine whether a product is permitted to enter the UK or what tax or duty applies. GOV.UK states that goods sent from abroad pass through customs and that the recipient may need to pay VAT, Customs Duty or other charges depending on the circumstances. Check current government guidance and the live carrier information for the parcel.</p><p>Use accurate product descriptions and do not assume a route name removes the need for correct declarations. If an item has a restricted or unusual attribute, resolve the shipping question before you depend on it being part of a combined parcel.</p>
<h2>12. A compact Sugargoo QC checklist</h2><ul><li>Match the warehouse entry to the saved link and exact variant.</li><li>Confirm quantity, main colour, visible size/model label and included pieces.</li><li>Check category-specific high-risk details rather than random cosmetic details.</li><li>Request measurements when sizing or dimensions drive the purchase decision.</li><li>Use personalised photography only for a clearly defined unanswered question.</li><li>Document visible mismatches before requesting after-sales handling.</li><li>Review the final parcel photo and submitted item list before international shipping.</li><li>Check current UK customs rules separately from warehouse QC.</li></ul><p>This independent guide uses Sugargoo’s official QC and workflow material checked on 8 August 2026. Service details can change. Always confirm the current QC options, order status, after-sales choices and route eligibility in the live Sugargoo account before making a final decision.</p>
'''

SPREADSHEET_BODY = r'''
<p>A useful Sugargoo spreadsheet is not a giant list of unexplained links. For a UK shopper, it should answer a more practical set of questions: what is the product, where is the current source listing, when was that link checked, which variant should be selected, what should be verified in QC, and what information could affect international shipping? When those fields are visible, a spreadsheet becomes a research tool rather than a collection of bookmarks.</p><p>This site’s “Sugargoo Spreadsheet UK 2026” is an independent curated catalogue, not an official Sugargoo inventory. The product pages point to the linked main shopping catalogue for current listing information. Sugargoo’s own official material explains the broader agent workflow: submit or search a product link, select specifications, purchase, receive the item in the warehouse, inspect QC photos, then build and ship an international parcel. A spreadsheet should support those decisions without pretending that a saved price or old product page can stay current forever.</p>
<h2>1. Use a smaller verified catalogue instead of chasing huge numbers</h2><p>A catalogue with tens of thousands of links can be useful for discovery, but size alone does not make it trustworthy. Links expire, sellers change options and titles can be reused. A curated list should therefore show a “last checked” date and give the reader a reason to open the current listing before paying. This site starts with a smaller set of real product links from the connected main catalogue so each item can have its own detail page and category context.</p><p>The detail page is not meant to replace the live source. It is a stable research layer: it keeps the category, image, source URL and buying checks together. The shopping button then opens the current listing, where the buyer should confirm today’s title, options, seller information and any price shown there.</p>
<h2>2. Record the source URL as evidence, not as a promise</h2><p>A product URL proves where the item was found when the spreadsheet was checked. It does not promise that stock, price or variants will remain unchanged. Save the full source URL, product page title and check date. If the listing later redirects, disappears or changes to another item, the spreadsheet entry can be reviewed instead of silently sending buyers to a different product.</p><p>When a source page uses a generic title such as “shoes-60,” create a clearer editorial label for navigation but keep the original listing title visible on the detail page. This improves usability without inventing a brand or model that the source does not provide.</p>
<h2>3. Separate product identity from the variant the buyer wants</h2><p>The product page and the selected variant are two different data points. A single clothing link may contain several colours and sizes; a shoe link may contain multiple versions; an accessory page can include the product and replacement parts under one price range. The spreadsheet should have a field for the source product and another for the exact option that needs confirmation.</p><p>Before ordering, copy the original option wording and save a screenshot when the choice is difficult to reconstruct. If a translation is needed, keep both the translation and the original text. The order can then be checked later even if the seller edits the page.</p>
<h2>4. Do not use a reference price as a live quote</h2><p>Prices on Chinese marketplace listings can change, and a displayed minimum can correspond to an accessory, deposit or different option. A spreadsheet should avoid creating the impression that a number saved last week is the amount a buyer will pay today. If a reference price is shown at all, label the date and tell the user to confirm the selected option on the current page.</p><p>Total cost also goes beyond the product amount. Domestic seller shipping, value-added services, packaging and international transport can be separate. Sugargoo’s official workflow treats product payment and later international parcel payment as distinct stages. Keeping those stages separate makes the spreadsheet more useful than an “all-in” number that has not yet been calculated.</p>
<h2>5. Add a QC note for every product type</h2><p>A good spreadsheet helps the user know what to inspect after the item reaches the warehouse. Sugargoo’s official QC FAQ states that shopping-agent orders receive five free QC photos per item. Use those images to confirm the order, then request extra photography only when a specific unanswered question matters.</p><p>For shoes, note size label, pair consistency and any measurement needed. For clothing, note colour, size label, seams, print or embroidery placement and measurements that matter for fit. For bags, note dimensions, straps and hardware. For electronics, note model label, plug type and included accessories while recognising that photographs cannot prove internal performance.</p>
<h2>6. Add shipping attributes before the item is in a parcel</h2><p>Some products can affect which international routes are available because of batteries, liquids, magnets, dimensions, fragility or other characteristics. A spreadsheet does not need to predict the final route, but it can flag “check route eligibility before purchase” so the issue is not discovered at the end of a large haul.</p><p>For UK shoppers, the live Sugargoo shipping calculator or parcel interface should be treated as the current source for routes and estimates. Official Sugargoo shipping guides explain that users select a destination, route and parcel information before paying international shipping. A spreadsheet should not freeze a route name or delivery time as if it were guaranteed.</p>
<h2>7. Use category pages to compare products with similar risks</h2><p>A category landing page can do more than show thumbnails. It can explain the checks that are common to that product type and then link to a small group of current finds. That makes category pages useful for long-tail searches such as Sugargoo shoes QC, Sugargoo hoodie sizing or Sugargoo electronics shipping instead of being thin pages with one paragraph and no products.</p><p>On this site, each category page links to local product detail pages for research and to the corresponding category on the main catalogue for shopping. This keeps the external site useful to searchers while preserving the main site as the shopping destination.</p>
<h2>8. Give every item a stable local detail page</h2><p>A local detail page gives the spreadsheet a permanent internal URL even when the source listing changes. It should show the saved image, editorial title, source listing title, category, check date and a short checklist. It should not copy claims it cannot verify, and it should not use Product or Offer structured data unless the site actually owns current merchant price and availability information.</p><p>The stable page also improves internal linking. Guides can link to relevant category examples, category pages can link to products, and the product detail can link back to QC and UK shipping guides. This creates a coherent topic structure instead of sending every internal click straight out of the site.</p>
<h2>9. Keep UK intent visible in the page, not just the domain</h2><p>A .uk domain is already a geographic signal, but the content should still explain why it is useful to a UK buyer. The homepage title, H1 and introduction should use the same UK spreadsheet language. UK shipping and customs guidance should be linked where relevant. Product pages should remind readers that route availability and import costs depend on current parcel details.</p><p>GOV.UK states that goods sent from abroad pass through customs and can be subject to VAT, Customs Duty or other charges depending on value and type. A spreadsheet should point users toward current government guidance rather than promising that a particular shipping line removes customs responsibilities.</p>
<h2>10. Remove dead or misleading entries instead of protecting the product count</h2><p>A healthy spreadsheet gets smaller when evidence gets weaker. Remove or clearly mark a product if the listing is dead, redirected to another item, missing the variant described in the entry or no longer supported by a usable source. Product count is a discovery metric, not a quality metric.</p><p>Review the most clicked or most visible entries more often than obscure ones. For a growing catalogue, a simple automated health check can request the source URL and flag redirects or errors, but a human still needs to inspect pages whose content changed while the HTTP status remained 200.</p>
<h2>11. A spreadsheet entry should contain these fields</h2><ul><li>Clear editorial product name.</li><li>Original source listing title.</li><li>Product category.</li><li>Current source URL.</li><li>Date the source was last checked.</li><li>Exact variant or a note that the buyer must choose the variant.</li><li>Category-specific QC checks.</li><li>Shipping attributes that may need route verification.</li><li>Local detail-page URL.</li><li>Status such as active, needs review or removed.</li></ul>
<h2>12. The spreadsheet should reduce uncertainty at each step</h2><p>The value of a Sugargoo spreadsheet is not that it lets a buyer skip verification. It is that it makes verification faster and more consistent. Discovery leads to a source page; the source page leads to a precise order; the warehouse stage leads to QC; and the parcel stage leads to route and UK import decisions. Each step should have a clear current source of truth.</p><p>This site is an independent product-discovery resource and is not operated by Sugargoo. Sugargoo’s official workflow, QC and shipping material was checked on 8 August 2026. Product links in the catalogue point to the connected main shopping site, where current listing information must be confirmed before purchase.</p>
'''

UK_SHIPPING_BODY = r'''
<p>Shipping from a Chinese warehouse to the United Kingdom is not one fixed price or one fixed route. The useful workflow is to identify the actual parcel, compare the live routes available for that parcel, understand chargeable weight, review the destination and customs information, and keep the tracking records after dispatch. A screenshot of somebody else’s quote can be a reference, but it is not a reliable prediction for a different postcode, parcel size or product mix.</p><p>Sugargoo’s official workflow says that buyers select items in the Packing Center, submit a parcel, add the delivery address, choose an available shipping route and pay the overseas delivery fee. Its official freight-calculator material explains that the calculator is used to estimate shipping costs and compare routes before checkout. Those tools should be treated as the current source for availability and estimates, because routes, restrictions and pricing can change.</p>
<h2>1. Start with destination and product attributes</h2><p>Enter the actual UK destination and describe the product category accurately when using a shipping estimator. A parcel of ordinary clothing may have different options from a parcel containing batteries, liquids or other restricted attributes. Do not assume that a route shown for one product type is available for another.</p><p>If you are still buying items, flag attributes that may change shipping eligibility before they reach the warehouse. It is easier to decide whether to separate an item while the order is still flexible than after every product has been consolidated into one expected parcel.</p>
<h2>2. Understand actual weight and volumetric weight</h2><p>International carriers may calculate charges using actual weight or a volumetric measure based on package dimensions. That means a light but bulky parcel can cost more than the scale weight suggests. This is why product price and even total item weight are not enough to predict international shipping.</p><p>Use warehouse dimensions or pre-shipment simulation information when available. Removing unnecessary packaging can reduce volume, but it can also reduce protection. Soft clothing and sturdy items tolerate different packing choices from structured shoes, delicate accessories or electronics. Optimise the parcel, not just the number on the scale.</p>
<h2>3. Compare the full route, not only the cheapest quote</h2><p>When several routes appear, compare eligibility, tracking detail, estimated delivery range, compensation or insurance options, restrictions and the carrier handoff as well as the displayed price. The lowest initial quote is not automatically the best choice for a time-sensitive or high-value parcel.</p><p>Sugargoo’s own shipping articles have used UK routes such as Royal Mail or UK tax-focused lines as examples, but route names and availability can change. The live calculator or parcel interface on the day you submit should take priority over an older article, video or spreadsheet.</p>
<h2>4. Decide whether to consolidate or split</h2><p>Combining multiple orders can reduce duplicated outer packaging and make one parcel easier to manage, and Sugargoo’s official workflow includes a Combine Package or parcel-submission stage. But consolidation is not always optimal. One unusual item may limit route choices for the whole parcel, a very large parcel can increase volumetric weight, and fragile goods may benefit from separate protection.</p><p>Test both scenarios when the choice is not obvious. Compare the route list and chargeable weight for the combined parcel against sensible smaller parcels. Include the operational cost of multiple tracking numbers and deliveries rather than assuming a split is free simply because each parcel is lighter.</p>
<h2>5. Check the final packing before payment</h2><p>Before paying international shipping, confirm the item list, address, parcel count, packaging instructions and declared information. Sugargoo’s official QC FAQ says a completed parcel includes one free parcel photo. Use that image as a final visible checkpoint, especially if you requested box removal, reinforcement or another packing change.</p><p>Keep a copy of the parcel number and the route selected. If a problem appears later, these records help distinguish a warehouse issue from a carrier issue or a customs request.</p>
<h2>6. Use the current UK customs guidance</h2><p>GOV.UK states that anything posted or couriered from another country goes through customs to check restrictions and the correct tax or duty. For goods sent from outside the UK to Great Britain, VAT can apply, and Customs Duty can apply in specified circumstances including certain goods above £135; the exact treatment depends on the goods and circumstances. Northern Ireland has additional rules because of its relationship with the EU customs framework.</p><p>Do not use a shipping-line name or community phrase as a guarantee that no VAT, duty, handling fee or customs review can occur. Check the current GOV.UK “Tax and customs for goods sent from abroad” guidance and use the Trade Tariff where a duty rate needs to be established.</p>
<h2>7. Keep declarations accurate</h2><p>A product spreadsheet and a shipping agent do not remove the need for correct customs information. Use descriptions and values that correspond to the goods. Avoid instructions that depend on hiding product attributes or deliberately misdescribing the parcel. Apart from the compliance risk, inaccurate data can make later support or insurance claims harder to explain.</p><p>If you are unsure how an item should be described, use the product’s actual function and material information that can be verified from the order rather than copying a vague label from somebody else’s parcel.</p>
<h2>8. Track the parcel by stage</h2><p>After dispatch, tracking can move through export processing, carrier handoff, flight or line-haul movement, UK arrival, customs, local carrier acceptance and last-mile delivery. A period without a new scan does not by itself prove the parcel is lost. Some stages produce few public events.</p><p>Sugargoo’s official workflow directs users to “My Parcel” to check logistics after shipment. Once a UK carrier has accepted the parcel, the carrier’s own tracking page may provide the most detailed last-mile information. Save both the original parcel number and any local tracking number generated after handoff.</p>
<h2>9. Know which party can answer which question</h2><p>Before dispatch, questions about parcel contents, packing and the selected route belong mainly to the warehouse or agent workflow. After carrier handoff, movement scans and delivery attempts increasingly depend on the logistics provider. Customs or tax requests are governed by UK rules and may be communicated by the carrier.</p><p>Directing a question to the right stage saves time. A warehouse cannot create a delivery scan after the parcel is with a UK courier, and a courier cannot decide which Chinese seller variant was originally ordered.</p>
<h2>10. Build a UK shipping record before the parcel moves</h2><ul><li>UK delivery name, address and postcode checked for accuracy.</li><li>Every parcel item and quantity confirmed.</li><li>Product attributes that may affect route eligibility recorded.</li><li>Actual and volumetric-weight implications reviewed.</li><li>Route compared on cost, restrictions, tracking and delivery range.</li><li>Packing instructions and final parcel image reviewed.</li><li>Customs description and value information checked for accuracy.</li><li>Parcel number, selected route and later local tracking number saved.</li><li>Current GOV.UK tax and customs guidance reviewed.</li></ul>
<h2>11. Do not turn estimates into promises</h2><p>A shipping calculator is an estimate tool. Delivery ranges are not guaranteed arrival dates, and route availability can change before the parcel is submitted. Weather, capacity, customs and local delivery conditions can also affect movement. A useful guide makes this uncertainty visible instead of hiding it behind one confident number.</p><p>When comparing historic quotes, note the date, parcel weight, dimensions, destination and product type. Without those fields, an old screenshot has very little predictive value.</p>
<h2>12. The best UK route is the one that fits the actual parcel</h2><p>For a UK shopper, the practical sequence is simple: buy with clear product records, check the goods in the warehouse, build the parcel, compare the live route options, verify packing and declarations, then follow current UK customs guidance and carrier tracking. Skipping one of these stages usually creates more uncertainty than it saves.</p><p>This is an independent guide, not a shipping quotation. Sugargoo’s official workflow, freight-calculator and shipping material and current GOV.UK customs guidance were checked on 8 August 2026. Verify live route availability, pricing, parcel measurements and government rules when you actually ship.</p>
'''

DEEP_GUIDES = {
    "/guides/sugargoo-warehouse-guide.html": {
        "title": "Sugargoo Warehouse Guide 2026: QC, Storage, Returns & Parcel Prep",
        "description": "A practical Sugargoo warehouse guide for UK shoppers covering arrivals, QC photos, storage, returns, consolidation, packing and parcel submission.",
        "h1": "Sugargoo Warehouse Guide 2026: QC, Storage, Returns & Parcel Prep",
        "lead": "Use the warehouse stage to match arrivals, review QC evidence, manage storage deadlines and prepare a UK-bound parcel before international shipping.",
        "body": WAREHOUSE_BODY,
        "sources": ["workflow", "qc", "storage", "returns", "govuk"],
    },
    "/guides/sugargoo-spreadsheet-guide.html": {
        "title": "Sugargoo Spreadsheet UK 2026: How to Verify Product Finds",
        "description": "Learn how to use a Sugargoo spreadsheet for UK shopping: verify product links, record variants, connect QC notes and keep shipping information current.",
        "h1": "Sugargoo Spreadsheet UK 2026: How to Verify Product Finds",
        "lead": "A useful spreadsheet connects a product source, the selected variant, QC checks and the current UK shipping decision instead of acting as a static link dump.",
        "body": SPREADSHEET_BODY,
        "sources": ["workflow", "qc", "calculator", "govuk"],
    },
    "/guides/sugargoo-uk-shipping-guide.html": {
        "title": "Sugargoo Shipping to UK 2026: Routes, Costs, Customs & Tracking",
        "description": "Plan Sugargoo shipping to the UK by comparing live routes, chargeable weight, packing, customs information and tracking without treating estimates as guarantees.",
        "h1": "Sugargoo Shipping to UK 2026: Routes, Costs, Customs & Tracking",
        "lead": "Compare the actual parcel and live route options, then check UK customs rules and keep the tracking record from warehouse submission to last-mile delivery.",
        "body": UK_SHIPPING_BODY,
        "sources": ["workflow", "calculator", "shipping", "qc", "govuk", "govuk_tax"],
    },
    "/guides/qc-guide.html": {
        "title": "Sugargoo QC Photos Guide 2026: What UK Buyers Should Check",
        "description": "A detailed Sugargoo QC photo guide for UK buyers covering five free QC photos, measurements, extra photography, returns and final parcel checks.",
        "h1": "Sugargoo QC Photos Guide 2026: What UK Buyers Should Check",
        "lead": "Turn warehouse QC photos into a decision: confirm the ordered variant, inspect category-specific visible details and resolve uncertainties before international shipping.",
        "body": QC_BODY,
        "sources": ["qc", "returns", "workflow", "govuk"],
    },
}

session = requests.Session()
session.headers.update({"User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9"})


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def get(url: str, timeout: int = 25) -> requests.Response:
    r = session.get(url, timeout=timeout)
    r.raise_for_status()
    return r


def image_from_node(node, base_url: str) -> str | None:
    if not node:
        return None
    for attr in ("src", "data-src", "data-original", "data-lazy-src"):
        raw = node.get(attr)
        if raw and not raw.startswith("data:"):
            return urljoin(base_url, raw)
    return None


def discover_candidates(category: dict) -> list[dict]:
    url = urljoin(MAIN, category["main"])
    soup = BeautifulSoup(get(url).text, "html.parser")
    found = []
    seen = set()
    for a in soup.select('a[href*="/AllProducts/"]'):
        product_url = urljoin(MAIN, a.get("href"))
        if product_url in seen:
            continue
        seen.add(product_url)
        wrapper = a
        for _ in range(4):
            if wrapper.parent:
                wrapper = wrapper.parent
        img = wrapper.find("img") if hasattr(wrapper, "find") else None
        found.append({"url": product_url, "thumb": image_from_node(img, url)})
        if len(found) >= 18:
            break
    return found


def product_record(category_slug: str, candidate: dict) -> dict | None:
    try:
        r = get(candidate["url"])
    except Exception as exc:
        print("skip product fetch", candidate["url"], exc)
        return None
    soup = BeautifulSoup(r.text, "html.parser")
    h1 = soup.find("h1")
    source_title = clean_text(h1.get_text(" ", strip=True) if h1 else "")
    if not source_title:
        source_title = clean_text((soup.title.string if soup.title else "Product").split("_")[0])
    pid_match = re.search(r"/AllProducts/(\d+)\.html", candidate["url"])
    pid = pid_match.group(1) if pid_match else hashlib.sha1(candidate["url"].encode()).hexdigest()[:8]
    editorial = source_title
    if re.fullmatch(r"shoes?-?\s*\d+", source_title, re.I) or not source_title or len(source_title) < 4:
        editorial = f"Curated Shoes Find {pid}"
    editorial = clean_text(editorial)[:76]
    image_url = candidate.get("thumb")
    meta_img = soup.select_one('meta[property="og:image"]')
    if meta_img and meta_img.get("content"):
        image_url = urljoin(candidate["url"], meta_img["content"])
    if not image_url:
        for img in soup.find_all("img"):
            candidate_url = image_from_node(img, candidate["url"])
            if candidate_url and not any(x in candidate_url.lower() for x in ("logo", "icon", "qr", "avatar")):
                image_url = candidate_url
                break
    if not image_url:
        return None
    return {"id": pid, "title": editorial, "source_title": source_title, "url": candidate["url"], "image_url": image_url, "category": category_slug}


def save_image(record: dict, seen_hashes: set[str]) -> bool:
    try:
        data = get(record["image_url"], timeout=30).content
        im = Image.open(BytesIO(data))
        im.load()
        if im.width < 160 or im.height < 160:
            return False
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        elif im.mode == "RGBA":
            bg = Image.new("RGB", im.size, "white")
            bg.paste(im, mask=im.split()[-1])
            im = bg
        im.thumbnail((760, 760), Image.Resampling.LANCZOS)
        out = BytesIO()
        im.save(out, "WEBP", quality=80, method=6)
        payload = out.getvalue()
        digest = hashlib.sha256(payload).hexdigest()
        if digest in seen_hashes:
            return False
        seen_hashes.add(digest)
        rel = f"assets/catalog/{record['category']}-{record['id']}.webp"
        path = BASE / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(payload)
        record["image"] = "/" + rel
        return True
    except Exception as exc:
        print("skip image", record.get("image_url"), exc)
        return False


def collect_catalog() -> list[dict]:
    products = []
    hashes: set[str] = set()
    for slug, cat in CATEGORIES.items():
        selected = []
        for cand in discover_candidates(cat):
            rec = product_record(slug, cand)
            if not rec:
                continue
            if save_image(rec, hashes):
                selected.append(rec)
            if len(selected) == 5:
                break
        if len(selected) != 5:
            raise RuntimeError(f"Could not collect five unique real products for {slug}; got {len(selected)}")
        products.extend(selected)
        print(slug, len(selected))
    if len(products) != 40 or len({p['url'] for p in products}) != 40:
        raise RuntimeError("Catalog must contain exactly 40 unique source URLs")
    return products


def nav(prefix: str = "") -> str:
    return f'''<header class="site-header"><a class="site-logo" href="{prefix}index.html"><img src="{prefix}assets/11.png" alt="Sugargoo spreadsheet UK guide logo" width="480" height="148"></a><nav class="site-nav"><a href="{prefix}index.html" data-i18n="nav.home">Home</a><a href="{prefix}index.html#daily-finds" data-i18n="nav.daily">Daily Finds</a><a href="{prefix}index.html#categories" data-i18n="nav.categories">Categories</a><a href="{prefix}products/" data-i18n="nav.spreadsheet">Spreadsheet</a><a href="{prefix}guides/" data-i18n="nav.guides">Guides</a><a href="{prefix}faq.html" data-i18n="nav.faq">FAQ</a></nav><select class="language-select" aria-label="Language"></select></header>'''


def footer(prefix: str = "") -> str:
    return f'''<footer class="site-footer"><div><strong data-i18n="footer.trust">Independent shopping discovery guide</strong><p data-i18n="footer.help">Products and orders are handled by the linked main site</p><p class="trust-links"><a href="{prefix}about.html">About</a> · <a href="{prefix}disclaimer.html">Disclaimer</a> · <a href="{prefix}privacy.html">Privacy</a> · <a href="{prefix}contact.html">Contact</a> · <a href="{prefix}categories/">Category Guides</a></p></div><div><strong data-i18n="footer.choose">Choose another language</strong><div class="footer-languages"><button data-language-button="en">English</button><button data-language-button="es">Español</button><button data-language-button="fr">Français</button><button data-language-button="de">Deutsch</button><button data-language-button="it">Italiano</button><button data-language-button="pt">Português</button><button data-language-button="pl">Polski</button><button data-language-button="nl">Nederlands</button><button data-language-button="zh">简体中文</button></div></div></footer>'''


def source_block(keys: list[str]) -> str:
    labels = {
        "workflow": "Sugargoo official features and workflow",
        "qc": "Sugargoo official QC service FAQ",
        "storage": "Sugargoo official warehouse storage guide",
        "returns": "Sugargoo official returns and refunds guide",
        "calculator": "Sugargoo official freight calculator guide",
        "shipping": "Sugargoo official shipping-estimate guide",
        "govuk": "GOV.UK goods sent from abroad overview",
        "govuk_tax": "GOV.UK tax and duty for goods sent from abroad",
    }
    items = "".join(f'<li><a href="{html.escape(OFFICIAL_SOURCES[k])}" target="_blank" rel="noopener">{html.escape(labels[k])}</a></li>' for k in keys)
    return f'<section class="article-sources"><h2>Sources checked</h2><p>Checked {TODAY}. Current account, route and government rules take priority over archived examples.</p><ul>{items}</ul></section>'


def page_shell(title: str, description: str, canonical: str, h1: str, lead: str, body: str, prefix: str, breadcrumb: str, schema_type: str = "Article") -> str:
    graph = [
        {"@type": schema_type, "headline": h1, "name": h1, "description": description, "url": canonical, "mainEntityOfPage": canonical, "inLanguage": "en-GB", "dateModified": TODAY, "author": {"@type": "Organization", "name": "Sugargoo VIP Editorial Team"}},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Shopping Guides", "item": SITE + "/guides/"},
            {"@type": "ListItem", "position": 3, "name": breadcrumb, "item": canonical},
        ]},
    ]
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(",", ":"))
    return f'''<!doctype html><html lang="en-GB"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)}</title><meta name="description" content="{html.escape(description)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><link rel="canonical" href="{canonical}"><link rel="icon" href="{prefix}assets/11.png" type="image/png"><meta property="og:type" content="article"><meta property="og:site_name" content="Sugargoo Spreadsheet UK"><meta property="og:title" content="{html.escape(title)}"><meta property="og:description" content="{html.escape(description)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{SITE}/assets/11.png"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="{prefix}assets/site.css"><script type="application/ld+json">{ld}</script></head><body>{nav(prefix)}<main class="wrap"><div class="breadcrumbs"><a href="{prefix}index.html">Home</a> / <a href="{prefix}guides/">Guides</a> / <span>{html.escape(breadcrumb)}</span></div><div class="article-layout"><article class="article-card"><h1>{html.escape(h1)}</h1><p class="article-lead">{html.escape(lead)}</p><div class="article-content">{body}</div></article><aside class="side-card"><a href="{prefix}products/">Sugargoo Spreadsheet UK</a><a href="{prefix}guides/sugargoo-warehouse-guide.html">Warehouse Guide</a><a href="{prefix}guides/qc-guide.html">QC Photos Guide</a><a href="{prefix}guides/sugargoo-uk-shipping-guide.html">UK Shipping Guide</a><a href="{prefix}guides/">All Guides</a></aside></div>{footer(prefix)}</main><script src="{prefix}assets/i18n-uk-20260808.js" defer></script><script src="{prefix}assets/language-fix-uk-20260808.js" defer></script></body></html>'''


def write_deep_guides():
    for route, data in DEEP_GUIDES.items():
        canonical = SITE + route
        prefix = "../" if route.startswith("/guides/") else ""
        body = data["body"] + source_block(data["sources"])
        page = page_shell(data["title"], data["description"], canonical, data["h1"], data["lead"], body, prefix, data["h1"])
        path = BASE / route.lstrip("/")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(page, encoding="utf-8")


def category_intro(cat: dict) -> str:
    return f'''<p>This UK-focused category page is an independent research layer rather than a merchant category. It groups five current finds from the linked main catalogue so a shopper can compare source listings, open a stable local detail page and remember the checks that matter before placing an order. Product links and images were rechecked on {TODAY}; current variants, prices and availability must still be confirmed on the live source page.</p><p>For {cat['name'].lower()}, the most useful pre-order and warehouse checks include {cat['focus']}. Save the exact variant text when ordering. After warehouse arrival, compare the item with the order record and use QC photos as visible evidence rather than a promise about properties that cannot be seen. If a measurement drives the buying decision, request that measurement instead of relying only on a size label.</p><p>UK shipping should be considered before the final parcel is built. Weight, dimensions and product attributes can change route eligibility and chargeable weight. Use the live shipping calculator and parcel interface for current options, then review accurate declaration information and current GOV.UK guidance for goods sent from abroad. This page does not quote a fixed shipping cost or delivery time because those figures depend on the actual parcel and can change.</p><p>The local detail pages below do not process purchases. Each has one shopping button to the connected main site and links back to the QC, warehouse and UK shipping guides. This lets the external site provide useful context while keeping the main catalogue as the shopping destination.</p>'''


def render_product_page(p: dict) -> str:
    cat = CATEGORIES[p["category"]]
    slug = f"{p['category']}-{p['id']}"
    canonical = f"{SITE}/products/{slug}.html"
    title = f"{p['title']} | Sugargoo Spreadsheet UK 2026"
    desc = f"Curated {cat['name'].lower()} find for UK shoppers with source-listing, QC and shipping checks. Open the linked main catalogue for current product details."
    ld = json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "ItemPage", "url": canonical, "name": p["title"], "description": desc, "inLanguage": "en-GB", "dateModified": TODAY, "primaryImageOfPage": {"@type": "ImageObject", "url": SITE + p["image"]}},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Product Finds", "item": SITE + "/products/"},
            {"@type": "ListItem", "position": 3, "name": cat["name"], "item": f"{SITE}/categories/{p['category']}.html"},
            {"@type": "ListItem", "position": 4, "name": p["title"], "item": canonical},
        ]}
    ]}, ensure_ascii=False, separators=(",", ":"))
    return f'''<!doctype html><html lang="en-GB"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)}</title><meta name="description" content="{html.escape(desc)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><link rel="canonical" href="{canonical}"><link rel="icon" href="../assets/11.png" type="image/png"><meta property="og:type" content="article"><meta property="og:site_name" content="Sugargoo Spreadsheet UK"><meta property="og:title" content="{html.escape(title)}"><meta property="og:description" content="{html.escape(desc)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{SITE}{p['image']}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="../assets/site.css"><script type="application/ld+json">{ld}</script></head><body>{nav('../')}<main class="wrap"><div class="breadcrumbs"><a href="../index.html">Home</a> / <a href="index.html">Product Finds</a> / <a href="../categories/{p['category']}.html">{html.escape(cat['name'])}</a> / <span>{html.escape(p['title'])}</span></div><div class="article-layout"><article class="article-card"><img src="{p['image']}" alt="{html.escape(p['title'])} product find" width="760" height="760" loading="eager" style="max-width:520px;width:100%;height:auto;border-radius:18px"><h1>{html.escape(p['title'])}</h1><p class="article-lead">Curated {html.escape(cat['name'].lower())} find in the Sugargoo Spreadsheet UK research catalogue.</p><div class="article-content"><h2>Source listing</h2><p><strong>Original listing title:</strong> {html.escape(p['source_title'])}</p><p><strong>Last checked:</strong> {TODAY}</p><p>This page keeps a stable research record but does not copy a live price or promise stock. Open the current listing before choosing a variant or paying.</p><p><a class="btn" href="{html.escape(p['url'])}" target="_blank" rel="noopener">Open current listing on main site</a></p><h2>What to verify before ordering</h2><p>Confirm the exact option, colour, size or model on the live source page. For this category, prioritise {html.escape(cat['focus'])}. Save the option text when several versions share the same product page.</p><h2>What to check after warehouse arrival</h2><p>Match the warehouse entry to the saved link and selected variant. Use QC photos to verify visible identity and condition. Request a targeted extra photo or measurement only when it can resolve a specific decision.</p><h2>UK shipping note</h2><p>Route availability and total shipping cost depend on the actual parcel, product attributes, weight, dimensions and destination. Use the live shipping estimator and current UK customs guidance instead of copying an old quote.</p><p><a href="../guides/qc-guide.html">QC photo guide</a> · <a href="../guides/sugargoo-warehouse-guide.html">Warehouse guide</a> · <a href="../guides/sugargoo-uk-shipping-guide.html">UK shipping guide</a></p></div></article><aside class="side-card"><a href="../products/">All 40 Product Finds</a><a href="../categories/{p['category']}.html">{html.escape(cat['name'])} Category Guide</a><a href="{html.escape(p['url'])}" target="_blank" rel="noopener">Main-site Listing</a></aside></div>{footer('../')}</main><script src="../assets/i18n-uk-20260808.js" defer></script><script src="../assets/language-fix-uk-20260808.js" defer></script></body></html>'''


def render_category_page(slug: str, cat: dict, products: list[dict]) -> str:
    canonical = f"{SITE}/categories/{slug}.html"
    title = f"Sugargoo {cat['name']} Finds UK 2026: Products, QC & Shipping Checks"
    desc = f"Browse five curated {cat['name'].lower()} product finds for UK shoppers, with local detail pages, QC checks and a direct link to the matching main-site category."
    cards = "".join(f'''<a class="card product-card" href="../products/{p['category']}-{p['id']}.html"><img src="{p['image']}" alt="{html.escape(p['title'])}" width="760" height="760" loading="lazy"><div class="product-meta"><h3>{html.escape(p['title'])}</h3><p>Source checked {TODAY}</p></div></a>''' for p in products)
    ld = json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "url": canonical, "name": title, "description": desc, "inLanguage": "en-GB", "dateModified": TODAY},
        {"@type": "ItemList", "numberOfItems": len(products), "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": p["title"], "url": f"{SITE}/products/{p['category']}-{p['id']}.html"} for i, p in enumerate(products)]}
    ]}, ensure_ascii=False, separators=(",", ":"))
    return f'''<!doctype html><html lang="en-GB"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)}</title><meta name="description" content="{html.escape(desc)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><link rel="canonical" href="{canonical}"><link rel="icon" href="../assets/11.png" type="image/png"><meta property="og:type" content="website"><meta property="og:site_name" content="Sugargoo Spreadsheet UK"><meta property="og:title" content="{html.escape(title)}"><meta property="og:description" content="{html.escape(desc)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{SITE}{products[0]['image']}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="../assets/site.css"><script type="application/ld+json">{ld}</script></head><body>{nav('../')}<main class="wrap"><div class="breadcrumbs"><a href="../index.html">Home</a> / <a href="index.html">Category Guides</a> / <span>{html.escape(cat['name'])}</span></div><section class="article-card"><h1>Sugargoo {html.escape(cat['name'])} Finds UK 2026</h1><p class="article-lead">Five current finds plus the checks that matter before ordering, QC approval and UK parcel submission.</p><div class="article-content">{category_intro(cat)}<p><a class="btn" href="{urljoin(MAIN, cat['main'])}" target="_blank" rel="noopener">Open {html.escape(cat['name'])} on main site</a> <a class="btn btn-secondary" href="../products/">Browse all 40 finds</a></p></div><div class="grid">{cards}</div></section>{footer('../')}</main><script src="../assets/i18n-uk-20260808.js" defer></script><script src="../assets/language-fix-uk-20260808.js" defer></script></body></html>'''


def render_category_index(products: list[dict]) -> str:
    cards = []
    for slug, cat in CATEGORIES.items():
        count = sum(1 for p in products if p["category"] == slug)
        cards.append(f'<a class="card guide-card" href="{slug}.html"><h3>{html.escape(cat["name"])}</h3><p>{count} curated finds plus UK-oriented QC and shipping checks.</p></a>')
    return f'''<!doctype html><html lang="en-GB"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sugargoo UK Product Categories 2026 | 40 Curated Finds</title><meta name="description" content="Browse eight Sugargoo UK product category guides with 40 curated finds, QC checks, local detail pages and main-site shopping links."><meta name="robots" content="index,follow"><link rel="canonical" href="{SITE}/categories/"><link rel="stylesheet" href="../assets/site.css"></head><body>{nav('../')}<main class="wrap"><section class="guide-hub article-card"><h1>Sugargoo UK Product Categories 2026</h1><p class="article-lead">Eight category landing pages connect curated product finds with the QC and shipping checks that matter for UK shoppers.</p><div class="grid">{''.join(cards)}</div></section>{footer('../')}</main><script src="../assets/i18n-uk-20260808.js" defer></script><script src="../assets/language-fix-uk-20260808.js" defer></script></body></html>'''


def render_catalog(products: list[dict]) -> str:
    grouped = []
    for slug, cat in CATEGORIES.items():
        subset = [p for p in products if p["category"] == slug]
        cards = "".join(f'''<a class="card product-card" href="{p['category']}-{p['id']}.html"><img src="{p['image']}" alt="{html.escape(p['title'])}" width="760" height="760" loading="lazy"><div class="product-meta"><h3>{html.escape(p['title'])}</h3><p>{html.escape(cat['name'])} · checked {TODAY}</p></div></a>''' for p in subset)
        grouped.append(f'<h2 class="section-title">{html.escape(cat["name"])}</h2><section class="grid home-products">{cards}</section>')
    items = [{"@type": "ListItem", "position": i + 1, "name": p["title"], "url": f"{SITE}/products/{p['category']}-{p['id']}.html"} for i, p in enumerate(products)]
    ld = json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "url": SITE + "/products/", "name": "Sugargoo Spreadsheet UK 2026: 40 Curated Product Finds", "description": "Independent curated product-finds catalogue for UK shoppers.", "inLanguage": "en-GB", "dateModified": TODAY},
        {"@type": "ItemList", "numberOfItems": 40, "itemListElement": items}
    ]}, ensure_ascii=False, separators=(",", ":"))
    return f'''<!doctype html><html lang="en-GB"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sugargoo Spreadsheet UK 2026: 40 Curated Product Finds</title><meta name="description" content="Browse 40 curated Sugargoo product finds for UK shoppers with local detail pages, category guides, QC checks and direct main-site shopping links."><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="{SITE}/products/"><link rel="icon" href="../assets/11.png" type="image/png"><meta property="og:type" content="website"><meta property="og:site_name" content="Sugargoo Spreadsheet UK"><meta property="og:title" content="Sugargoo Spreadsheet UK 2026: 40 Curated Product Finds"><meta property="og:description" content="40 curated product finds with stable local detail pages, category context and UK-oriented QC and shipping checks."><meta property="og:url" content="{SITE}/products/"><meta property="og:image" content="{SITE}{products[0]['image']}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="../assets/site.css"><script type="application/ld+json">{ld}</script></head><body>{nav('../')}<main class="wrap"><section class="guide-hub article-card"><h1>Sugargoo Spreadsheet UK 2026: 40 Curated Product Finds</h1><p class="article-lead">A smaller, verifiable catalogue for UK shoppers: each find has a stable local detail page and one current shopping link to the connected main catalogue.</p><div class="article-content"><p>This is an independent product-discovery catalogue, not an official Sugargoo inventory. Product source pages and images were checked on {TODAY}. Confirm the current listing, selected variant and any price or availability on the main site before purchase.</p><p><a class="btn" href="{MAIN}/" target="_blank" rel="noopener">Open main product catalogue</a> <a class="btn btn-secondary" href="../guides/sugargoo-spreadsheet-guide.html">How to use this spreadsheet</a></p></div></section>{''.join(grouped)}{footer('../')}</main><script src="../assets/i18n-uk-20260808.js" defer></script><script src="../assets/language-fix-uk-20260808.js" defer></script></body></html>'''


def write_catalog(products: list[dict]):
    product_dir = BASE / "products"
    product_dir.mkdir(parents=True, exist_ok=True)
    (product_dir / "index.html").write_text(render_catalog(products), encoding="utf-8")
    cat_dir = BASE / "categories"
    cat_dir.mkdir(parents=True, exist_ok=True)
    (cat_dir / "index.html").write_text(render_category_index(products), encoding="utf-8")
    for p in products:
        (product_dir / f"{p['category']}-{p['id']}.html").write_text(render_product_page(p), encoding="utf-8")
    for slug, cat in CATEGORIES.items():
        subset = [p for p in products if p["category"] == slug]
        (cat_dir / f"{slug}.html").write_text(render_category_page(slug, cat, subset), encoding="utf-8")
    (BASE / "assets/catalog/catalog.json").write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")


def patch_i18n():
    source_path = BASE / "assets/i18n-v5.js"
    source = source_path.read_text(encoding="utf-8")
    # Preserve the translation dictionary but replace navigation/title mutation with a simple same-page language state.
    source = re.sub(r"function pageBasePath\(\)\{.*?function apply", "function chooseLanguage(lang){if(!T[lang])lang='en';localStorage.setItem('sugargooLang',lang);const u=new URL(location.href);if(lang==='en')u.searchParams.delete('lang');else u.searchParams.set('lang',lang);history.replaceState({sugargooLanguage:lang},'',u.pathname+(u.searchParams.toString()?'?'+u.searchParams.toString():'')+u.hash);apply(lang);window.dispatchEvent(new CustomEvent('sugargoo:languagechange',{detail:{lang}}));}\nfunction apply", source, count=1, flags=re.S)
    # Remove document.title mutation so Google does not see the short JS title such as "Shopping Guide | Sugargoo VIP".
    source = re.sub(r"const tk=document\.body\.dataset\.titleKey;.*?document\.title=d\[tk\]\+' \| Sugargoo VIP';", "", source, count=1)
    build_pattern = r"function build\(\)\{.*?document\.addEventListener\('DOMContentLoaded',build\);"
    build = """function build(){const params=new URLSearchParams(location.search);const requested=params.get('lang');const saved=(requested&&T[requested])?requested:(localStorage.getItem('sugargooLang')||'en');document.querySelectorAll('.language-select').forEach(sel=>{sel.innerHTML='';Object.entries(labels).forEach(([value,name])=>{const option=document.createElement('option');option.value=value;option.textContent='🌐 '+name;sel.appendChild(option)});sel.addEventListener('change',()=>chooseLanguage(sel.value))});document.querySelectorAll('[data-language-button]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();chooseLanguage(button.dataset.languageButton)}));apply(saved);window.SugargooSetLanguage=chooseLanguage;}\ndocument.addEventListener('DOMContentLoaded',build);window.addEventListener('popstate',()=>{const q=new URLSearchParams(location.search).get('lang');apply((q&&T[q])?q:(localStorage.getItem('sugargooLang')||'en'));});"""
    source, n = re.subn(build_pattern, build, source, count=1, flags=re.S)
    if n != 1:
        raise RuntimeError("Could not patch i18n build function")
    # Homepage translation strings are aligned with the UK spreadsheet target.
    replacements = {
        "'hero.b':'Shopping Guide'": "'hero.b':'Spreadsheet UK'",
        "'hero.intro':'Your independent resource for product discovery, buying guides, QC checks and shipping information.'": "'hero.intro':'Browse curated product finds for UK shoppers, compare listing details, check QC photos and plan warehouse and international shipping decisions.'",
        "'sheet.title':'Sugargoo Spreadsheet 2026'": "'sheet.title':'Sugargoo Spreadsheet UK 2026'",
    }
    for old, new in replacements.items():
        source = source.replace(old, new)
    new_path = BASE / "assets/i18n-uk-20260808.js"
    new_path.write_text(source, encoding="utf-8")

    old_fix = (BASE / "assets/language-fix-v5.js").read_text(encoding="utf-8")
    marker = old_fix.find("function selectedLanguage(){")
    if marker < 0:
        marker = old_fix.find("  function selectedLanguage(){")
    if marker < 0:
        raise RuntimeError("Could not locate language-fix dictionary tail")
    prefix = old_fix[:marker]
    safe_tail = r'''function selectedLanguage(){const q=new URLSearchParams(location.search).get('lang');return q||localStorage.getItem('sugargooLang')||'en';}
function cardKey(card){try{return new URL(card.getAttribute('href'),location.href).pathname.split('/').filter(Boolean).pop()||'';}catch{return '';}}
function localizeGuideCards(lang){document.querySelectorAll('.guide-card').forEach(card=>{card.hidden=false;card.removeAttribute('hidden');const dictionary=(typeof L!=='undefined'&&(L[lang]||L.en))||{};const copy=dictionary[cardKey(card)];if(!copy)return;const h=card.querySelector('h3'),p=card.querySelector('p');if(h)h.textContent=copy[0];if(p)p.textContent=copy[1];});const intro=document.querySelector('[data-guide-hub-intro],.guide-hub .article-lead');if(intro&&typeof INTRO!=='undefined'&&INTRO[lang])intro.textContent=INTRO[lang];}
document.addEventListener('DOMContentLoaded',()=>localizeGuideCards(selectedLanguage()));window.addEventListener('sugargoo:languagechange',event=>localizeGuideCards(event.detail.lang));window.addEventListener('pageshow',()=>localizeGuideCards(selectedLanguage()));})();'''
    (BASE / "assets/language-fix-uk-20260808.js").write_text(prefix + safe_tail, encoding="utf-8")


def rewrite_static_script_refs():
    for page in BASE.rglob("*.html"):
        text = page.read_text(encoding="utf-8")
        text = re.sub(r"i18n(?:-v5|-uk-20260808)?\.js", "i18n-uk-20260808.js", text)
        text = re.sub(r"language-fix(?:-v5|-uk-20260808)?\.js", "language-fix-uk-20260808.js", text)
        # Temporarily remove hreflang from indexable static HTML until complete translated documents exist.
        text = re.sub(r"<link rel=\"alternate\" hreflang=\"[^\"]+\" href=\"[^\"]+\">", "", text)
        # Spreadsheet navigation becomes the local 40-item catalogue instead of an unrelated homepage.
        text = re.sub(r'href="https://www\.cnfanshp\.com/"([^>]*data-i18n="nav\.spreadsheet")', 'href="/products/"\\1', text)
        page.write_text(text, encoding="utf-8")


def patch_home(products: list[dict]):
    path = BASE / "index.html"
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    title = "Sugargoo Spreadsheet UK 2026: Product Finds, QC & Shipping"
    desc = "Browse curated Sugargoo product finds for UK shoppers, compare listing details, check QC photos and plan warehouse and international shipping decisions."
    soup.title.string = title
    meta = soup.find("meta", attrs={"name": "description"}); meta["content"] = desc
    for prop in ("og:title",):
        tag = soup.find("meta", attrs={"property": prop})
        if tag: tag["content"] = title
    tag = soup.find("meta", attrs={"property": "og:description"})
    if tag: tag["content"] = desc
    t = soup.find("meta", attrs={"name": "twitter:title"})
    if t: t["content"] = title
    t = soup.find("meta", attrs={"name": "twitter:description"})
    if t: t["content"] = desc
    h1 = soup.find("h1")
    h1.clear()
    h1.append("Sugargoo Spreadsheet UK ")
    span = soup.new_tag("span", attrs={"class": "orange"}); span.string = "2026"; h1.append(span)
    hero_p = soup.select_one(".hero-content > p")
    if hero_p:
        hero_p.attrs.pop("data-i18n", None)
        hero_p.string = desc
    body = soup.body
    if body: body.attrs.pop("data-title-key", None)
    sheet_h2 = soup.select_one(".home-sheet h2")
    if sheet_h2:
        sheet_h2.attrs.pop("data-i18n", None); sheet_h2.string = "Sugargoo Spreadsheet UK 2026"
    stats = soup.select(".home-sheet .stat-chip strong")
    if len(stats) >= 3:
        stats[0].string = "40"; stats[1].string = "8"; stats[2].string = "22"
    cta = soup.select_one(".home-sheet > a.btn")
    if cta:
        cta["href"] = "products/"; cta.attrs.pop("target", None); cta.attrs.pop("rel", None); cta.string = "Browse 40 Product Finds"
    nav_sheet = soup.select_one('.site-nav a[data-i18n="nav.spreadsheet"]')
    if nav_sheet:
        nav_sheet["href"] = "products/"; nav_sheet.attrs.pop("target", None); nav_sheet.attrs.pop("rel", None)
    actions = soup.select_one(".hero-actions")
    if actions and not actions.find("a", href="products/"):
        a = soup.new_tag("a", href="products/", attrs={"class": "btn btn-secondary"}); a.string = "Browse 40 Finds"; actions.append(a)
    first_h3 = soup.select_one(".home-products .product-card h3")
    if first_h3 and first_h3.get_text(strip=True).lower().startswith("shoes-"):
        first_h3.string = "Curated Shoes Find 6045"
    ld_tag = soup.find("script", attrs={"type": "application/ld+json"})
    if ld_tag:
        data = json.loads(ld_tag.string)
        for node in data.get("@graph", []):
            if node.get("@type") == "WebSite":
                node["name"] = "Sugargoo Spreadsheet UK"
                node["description"] = desc
                node["inLanguage"] = "en-GB"
            if node.get("@type") == "CollectionPage":
                node["name"] = title
                node["description"] = desc
                node["dateModified"] = TODAY
                node["inLanguage"] = "en-GB"
            if node.get("@type") == "ItemList":
                node["name"] = "Sugargoo Spreadsheet UK curated product finds"
                node["numberOfItems"] = 40
                node["itemListElement"] = [{"@type": "ListItem", "position": i + 1, "url": f"{SITE}/products/{p['category']}-{p['id']}.html", "name": p["title"]} for i, p in enumerate(products[:8])]
        ld_tag.string = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    text = str(soup)
    text = text.replace("assets/i18n-v5.js", "assets/i18n-uk-20260808.js").replace("assets/language-fix-v5.js", "assets/language-fix-uk-20260808.js")
    path.write_text(text, encoding="utf-8")


def englishify_reverse_articles():
    mapping = {
        "sugargoo-reverse-shopping-multi-item-order-ledger.html": "multi-item-order-ledger.js",
        "sugargoo-reverse-shopping-image-to-product-link.html": "image-to-product-link.js",
        "sugargoo-reverse-shopping-confirmation-checkpoints.html": "confirmation-checkpoints.js",
        "sugargoo-reverse-shopping-order-boundaries.html": "order-boundaries.js",
        "sugargoo-reverse-shopping-product-link-workflow.html": "product-link-workflow.js",
    }
    for html_name, js_name in mapping.items():
        page_path = BASE / "guides" / html_name
        js_path = BASE / "assets/reverse-articles" / js_name
        if not page_path.exists() or not js_path.exists():
            continue
        js = js_path.read_text(encoding="utf-8")
        m = re.search(r"en:\{title:'([^']+)',lead:'([^']+)',body:`([\s\S]*?)`,side:\[", js)
        if not m:
            raise RuntimeError(f"Could not extract English translation from {js_name}")
        title, lead, body = m.groups()
        soup = BeautifulSoup(page_path.read_text(encoding="utf-8"), "html.parser")
        soup.html["lang"] = "en-GB"
        soup.title.string = title + " | Sugargoo UK Guide"
        h1 = soup.select_one(".article-card h1"); h1.string = title
        lead_tag = soup.select_one(".article-lead"); lead_tag.string = lead
        body_tag = soup.select_one(".article-content"); body_tag.clear(); frag = BeautifulSoup(body, "html.parser")
        for child in list(frag.contents): body_tag.append(child)
        for meta in soup.find_all("meta"):
            if meta.get("property") == "og:locale": meta["content"] = "en_GB"
            if meta.get("property") == "og:title": meta["content"] = title
        ld = soup.find("script", attrs={"type": "application/ld+json"})
        if ld and ld.string:
            try:
                data = json.loads(ld.string)
                for node in data.get("@graph", []):
                    if node.get("@type") in ("Article", "BlogPosting"):
                        node["headline"] = title; node["inLanguage"] = "en-GB"; node["dateModified"] = TODAY
                ld.string = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
            except Exception:
                pass
        text = str(soup).replace("i18n-v5.js", "i18n-uk-20260808.js").replace("language-fix-v5.js", "language-fix-uk-20260808.js")
        page_path.write_text(text, encoding="utf-8")


def update_guide_index():
    path = BASE / "guides/index.html"
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    for card in soup.select(".guide-card"):
        href = card.get("href", "")
        if href.endswith("sugargoo-warehouse-guide.html"):
            card.h3.string = "Sugargoo Warehouse Guide 2026: QC, Storage, Returns & Parcel Prep"
            card.p.string = "Deep UK-focused guide to arrivals, QC, storage deadlines, returns, consolidation and parcel preparation."
        elif href.endswith("sugargoo-spreadsheet-guide.html"):
            card.h3.string = "Sugargoo Spreadsheet UK 2026"
            card.p.string = "How to verify product links, variants, QC notes and shipping attributes in a useful research catalogue."
        elif href.endswith("sugargoo-uk-shipping-guide.html"):
            card.h3.string = "Sugargoo Shipping to UK 2026"
            card.p.string = "Compare live routes, chargeable weight, packing, customs information and tracking without fixed promises."
        elif href.endswith("qc-guide.html"):
            card.h3.string = "Sugargoo QC Photos Guide 2026"
            card.p.string = "Detailed UK-buyer checklist for free QC photos, measurements, extra photography, returns and parcel checks."
    path.write_text(str(soup).replace("i18n-v5.js", "i18n-uk-20260808.js").replace("language-fix-v5.js", "language-fix-uk-20260808.js"), encoding="utf-8")


def patch_worker(static_paths: list[str], canonical_html: list[str]):
    path = BASE / "_worker.js"
    w = path.read_text(encoding="utf-8")
    # Remove earlier injected upgrade block if this generator is re-run.
    w = re.sub(r"\n/\* UK_SEO_UPGRADE_START \*/[\s\S]*?/\* UK_SEO_UPGRADE_END \*/\n", "\n", w)
    constants = "\n/* UK_SEO_UPGRADE_START */\nconst UK_STATIC_OVERRIDES = new Set(" + json.dumps(sorted(static_paths)) + ");\nconst UK_CANONICAL_HTML = new Set(" + json.dumps(sorted(canonical_html)) + ");\n/* UK_SEO_UPGRADE_END */\n"
    anchor = 'const UPDATED = "2026-07-10";'
    if anchor in w:
        w = w.replace(anchor, 'const UPDATED = "2026-08-08";' + constants, 1)
    elif "const UPDATED" in w:
        w = re.sub(r'const UPDATED = "[^"]+";', 'const UPDATED = "2026-08-08";' + constants, w, count=1)
    else:
        w = constants + w
    fetch_re = re.compile(r"async fetch\(request, env\)\s*\{")
    m = fetch_re.search(w)
    if not m:
        raise RuntimeError("Could not locate Worker fetch handler")
    early = r'''
      const __ukUrl = new URL(request.url);
      if (__ukUrl.hostname === "www.sugargoovip.uk" || __ukUrl.hostname.endsWith(".pages.dev")) {
        __ukUrl.protocol = "https:"; __ukUrl.hostname = "sugargoovip.uk"; __ukUrl.port = "";
        return Response.redirect(__ukUrl.toString(), 301);
      }
      const __legacyLocale = __ukUrl.pathname.match(/^\/(de|fr|es|pl)(\/.*)?$/);
      if (__legacyLocale) {
        __ukUrl.pathname = __legacyLocale[2] || "/";
        __ukUrl.searchParams.set("lang", __legacyLocale[1]);
        return Response.redirect(__ukUrl.toString(), 301);
      }
      const __last = __ukUrl.pathname.split('/').filter(Boolean).pop() || '';
      if (__last && !__last.includes('.') && !__ukUrl.pathname.endsWith('/') && UK_CANONICAL_HTML.has(__ukUrl.pathname + '.html')) {
        __ukUrl.pathname = __ukUrl.pathname + '.html';
        return Response.redirect(__ukUrl.toString(), 301);
      }
      if (UK_STATIC_OVERRIDES.has(__ukUrl.pathname)) {
        const __asset = new URL(request.url);
        __asset.pathname = __ukUrl.pathname.endsWith('/') ? __ukUrl.pathname + 'index.html' : __ukUrl.pathname;
        __asset.search = '';
        const __res = await env.ASSETS.fetch(new Request(__asset.toString(), request));
        if (__res.ok) return new Response(__res.body, __res);
      }
'''
    # Avoid duplicate insertion.
    if "const __ukUrl = new URL(request.url);" not in w:
        w = w[:m.end()] + early + w[m.end():]
    w = w.replace("/assets/i18n-v5.js", "/assets/i18n-uk-20260808.js").replace("/assets/language-fix-v5.js", "/assets/language-fix-uk-20260808.js")
    path.write_text(w, encoding="utf-8")


def rebuild_sitemaps(products: list[dict]):
    sitemap_path = BASE / "sitemap.xml"
    soup = BeautifulSoup(sitemap_path.read_text(encoding="utf-8"), "xml")
    existing = []
    for loc in soup.find_all("loc"):
        url = clean_text(loc.get_text())
        if url.startswith(SITE): existing.append(url)
    new_urls = [SITE + "/products/"] + [f"{SITE}/products/{p['category']}-{p['id']}.html" for p in products]
    new_urls += [SITE + "/categories/"] + [f"{SITE}/categories/{slug}.html" for slug in CATEGORIES]
    for route in DEEP_GUIDES: new_urls.append(SITE + route)
    urls = []
    for url in existing + new_urls:
        if url not in urls: urls.append(url)
    changed = {SITE + "/", SITE + "/products/", SITE + "/categories/"}
    changed.update(SITE + r for r in DEEP_GUIDES)
    changed.update(f"{SITE}/categories/{slug}.html" for slug in CATEGORIES)
    changed.update(f"{SITE}/products/{p['category']}-{p['id']}.html" for p in products)
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url in urls:
        last = TODAY if url in changed else "2026-07-16" if url == SITE + "/guides/" else "2026-07-10"
        priority = "1.0" if url == SITE + "/" else "0.9" if url in (SITE + "/products/", SITE + "/categories/", SITE + "/guides/") else "0.8"
        lines.append(f"  <url><loc>{html.escape(url)}</loc><lastmod>{last}</lastmod><changefreq>weekly</changefreq><priority>{priority}</priority></url>")
    lines.append("</urlset>")
    sitemap_path.write_text("\n".join(lines), encoding="utf-8")
    (BASE / "sitemap.txt").write_text("\n".join(urls) + "\n", encoding="utf-8")
    (BASE / "sitemap-index.xml").write_text(f'''<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>{SITE}/sitemap.xml</loc><lastmod>{TODAY}</lastmod></sitemap>\n</sitemapindex>''', encoding="utf-8")
    # Keep previously submitted language sitemap endpoints valid but empty and remove them from the index until true translations exist.
    empty = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n'
    for lang in ("de", "fr", "es", "pl"):
        p = BASE / f"sitemap-{lang}.xml"
        if p.exists(): p.write_text(empty, encoding="utf-8")
    (BASE / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap-index.xml\n", encoding="utf-8")
    return urls


def patch_headers():
    p = BASE / "_headers"
    text = p.read_text(encoding="utf-8") if p.exists() else ""
    rules = '''\n/assets/i18n-uk-20260808.js\n  Cache-Control: no-store\n\n/assets/language-fix-uk-20260808.js\n  Cache-Control: no-store\n\n/assets/catalog/*\n  Cache-Control: public, max-age=604800, immutable\n'''
    if "/assets/i18n-uk-20260808.js" not in text: text += rules
    p.write_text(text, encoding="utf-8")


def visible_words(path: Path, selector: str = ".article-content") -> int:
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    node = soup.select_one(selector) or soup
    return len(re.findall(r"\b[A-Za-z0-9][A-Za-z0-9’'\-]*\b", node.get_text(" ", strip=True)))


def validate(products: list[dict], sitemap_urls: list[str]):
    assert len(products) == 40
    assert len({p["url"] for p in products}) == 40
    assert len({p["image"] for p in products}) == 40
    for route in DEEP_GUIDES:
        count = visible_words(BASE / route.lstrip("/"))
        print(route, count, "words")
        assert 1200 <= count <= 1800, (route, count)
    home = BeautifulSoup((BASE / "index.html").read_text(encoding="utf-8"), "html.parser")
    assert home.title.get_text(strip=True) == "Sugargoo Spreadsheet UK 2026: Product Finds, QC & Shipping"
    assert "Sugargoo Spreadsheet UK" in home.h1.get_text(" ", strip=True)
    assert not home.body.has_attr("data-title-key")
    assert home.select_one(".home-sheet > a.btn").get("href") == "products/"
    assert "40" in [x.get_text(strip=True) for x in home.select(".home-sheet .stat-chip strong")]
    for slug in CATEGORIES:
        c = BASE / f"categories/{slug}.html"; assert c.exists()
        cs = BeautifulSoup(c.read_text(encoding="utf-8"), "html.parser")
        assert len(cs.select(".product-card")) == 5
    assert len(list((BASE / "products").glob("*.html"))) == 41
    assert len(sitemap_urls) == len(set(sitemap_urls))
    assert SITE + "/products/" in sitemap_urls
    idx = (BASE / "sitemap-index.xml").read_text(encoding="utf-8")
    assert idx.count("<sitemap>") == 1 and "sitemap-de.xml" not in idx
    assert (BASE / "robots.txt").read_text(encoding="utf-8").count("Sitemap:") == 1
    # Reverse-shopping articles must have an English default article body.
    for f in (BASE / "guides").glob("sugargoo-reverse-shopping-*.html"):
        s = BeautifulSoup(f.read_text(encoding="utf-8"), "html.parser")
        article = s.select_one(".article-card")
        if article:
            assert len(re.findall(r"[\u4e00-\u9fff]", article.get_text())) == 0, f
    # Temporarily no indexable hreflang alternates until full translated documents are published.
    for f in BASE.rglob("*.html"):
        text = f.read_text(encoding="utf-8")
        assert 'rel="alternate" hreflang=' not in text
    worker = (BASE / "_worker.js").read_text(encoding="utf-8")
    assert "UK_STATIC_OVERRIDES" in worker and "UK_CANONICAL_HTML" in worker
    assert "__legacyLocale" in worker and ".html';" in worker
    i18n = (BASE / "assets/i18n-uk-20260808.js").read_text(encoding="utf-8")
    assert "document.title=d[tk]" not in i18n
    assert "history.replaceState" in i18n and "searchParams.set('lang'" in i18n
    fix = (BASE / "assets/language-fix-uk-20260808.js").read_text(encoding="utf-8")
    assert "location.replace" not in fix and "location.reload" not in fix


def main():
    products = collect_catalog()
    write_catalog(products)
    write_deep_guides()
    englishify_reverse_articles()
    patch_i18n()
    rewrite_static_script_refs()
    patch_home(products)
    update_guide_index()
    sitemap_urls = rebuild_sitemaps(products)
    static_paths = ["/products/", "/categories/"]
    static_paths += [f"/products/{p['category']}-{p['id']}.html" for p in products]
    static_paths += [f"/categories/{slug}.html" for slug in CATEGORIES]
    static_paths += list(DEEP_GUIDES.keys())
    canonical_html = [urlparse(u).path for u in sitemap_urls if urlparse(u).path.endswith(".html")]
    patch_worker(static_paths, canonical_html)
    patch_headers()
    # Rewrite new script refs once more after pages generated by all helpers.
    rewrite_static_script_refs()
    validate(products, sitemap_urls)
    print(f"PASS: Sugargoo UK upgrade generated {len(products)} products and {len(sitemap_urls)} sitemap URLs")


if __name__ == "__main__":
    main()
