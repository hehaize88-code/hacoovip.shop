export function ProductLinkHelper(){
  return <div className="product-link-helper" id="product-link-helper">
    <h2>Check a marketplace product link</h2>
    <p>Paste a full Taobao, Tmall, Weidian or 1688 product URL. This checker removes tracking parameters and shows the marketplace item ID. It does not check stock, convert directory IDs or resolve shortened links.</p>
    <form id="link-checker">
      <label htmlFor="marketplace-link">Product URL</label>
      <input type="url" id="marketplace-link" name="productUrl" required placeholder="https://weidian.com/item.html?itemID=…" autoComplete="off"/>
      <button type="submit">Check link</button>
      <p className="link-helper-message" data-link-message="invalid" hidden>Use a full supported product URL with a numeric item ID. For a short link, open it in your browser and copy the full product address.</p>
      <div data-link-result hidden>
        <p><strong>Marketplace</strong>: <output data-marketplace/></p>
        <p><strong>Marketplace item ID</strong>: <output data-item-id/></p>
        <label htmlFor="clean-product-link">Clean product URL</label>
        <input id="clean-product-link" readOnly/>
        <p><a data-clean-link target="_blank" rel="noopener noreferrer">Open the original listing ↗</a></p>
        <p>Copy the clean URL, open the official Hipobuy website and paste it into its product search. Check the returned listing and selected variation before payment.</p>
        <a href="https://hipobuy.com/" target="_blank" rel="noopener noreferrer">Open Hipobuy ↗</a>
      </div>
      <div role="status" aria-live="polite"><span data-link-announcement="success" hidden>Product link recognised. The clean URL is ready below.</span><span data-link-announcement="error" hidden>Link not recognised. Check the product address.</span></div>
    </form>
  </div>;
}
