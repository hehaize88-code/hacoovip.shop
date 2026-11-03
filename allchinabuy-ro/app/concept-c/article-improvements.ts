import type { FullArticle } from "./articles";

export const articleImprovements: Record<string, Partial<FullArticle>> = {
  "spreadsheet-guide": {
    "title": "How to Verify an AllChinaBuy Spreadsheet Link Before You Order",
    "description": "Follow a real spreadsheet entry to its original Weidian listing, then match the item ID, selected variant and size evidence before buying.",
    "modified": "2026-11-03",
    "intro": ["Try the white printed shirt example below. Its catalogue record ends in 5934, while the link to Weidian identifies item 7727281311. Open the original listing and notice that it groups several designs. Record the chosen print and size before you compare the warehouse photos. This is a concrete way to test a spreadsheet row even when its title and thumbnail are too broad to identify a specific option."],
    "summary": "Treat the spreadsheet as a discovery index. Match the live variant, size evidence and current listing before adding an item to your shortlist.",
    "table": {
      "caption": "A shortlist that keeps evidence visible",
      "headers": [
        "Record",
        "Minimum detail",
        "Recheck when"
      ],
      "rows": [
        [
          "Listing",
          "Exact destination and selected variant",
          "Before ordering"
        ],
        [
          "Size",
          "Units and measurement basis",
          "Before accepting QC"
        ],
        [
          "Price",
          "Currency, variant and observation date",
          "Before payment"
        ],
        [
          "Shipping",
          "Separate parcel estimate",
          "After packing"
        ]
      ]
    },
    "related": ["qc-photos-weidian-taobao-link", "t-shirt-size-chart-qc", "qc-photo-routine"],
    "category": "shoes"
  },
  "qc-photo-routine": {
    "title": "How to Read AllChinaBuy QC Photos: Size, Details and Defects",
    "description": "Read front and back photos from a real listing, check what the ruler proves, and request the exact warehouse image you need before parcel submission.",
    "modified": "2026-11-03",
    "intro": ["Start with the white printed T-shirt below. In the front view, compare the placement of the artwork with the selected option. The reverse view lets you inspect the back and hem that the first view conceals. Neither ruler runs from one underarm seam to the other. If chest width decides whether the tee fits, request a new photograph with both seam endpoints visible. If you still need to find photos, use the Weidian and Taobao link guide."],
    "summary": "Check identity and quantity first, then request measurements or close-ups that resolve one specific uncertainty. Ordinary QC photos do not authenticate a product.",
    "table": {
      "caption": "Match the QC request to the unresolved question",
      "headers": [
        "Item",
        "Useful evidence",
        "What remains unknown"
      ],
      "rows": [
        [
          "Shoes",
          "Both size labels and pair views",
          "Comfort, durability and authenticity"
        ],
        [
          "Hoodie",
          "Chest and length with visible ruler endpoints",
          "Shrinkage and wash performance"
        ],
        [
          "Accessory",
          "Quantity, dimensions and included parts",
          "Long-term function without a test"
        ],
        [
          "Visible defect",
          "Clear location and focused close-up",
          "Cause or compensation eligibility"
        ]
      ]
    },
    "related": ["qc-photos-weidian-taobao-link", "t-shirt-size-chart-qc", "shoes-spreadsheet-eu-size-qc"],
    "category": null
  },
  "parcel-cost-guide": {
    "title": "AllChinaBuy Shipping to Romania: Estimate Weight and Parcel Cost",
    "description": "Compare two 2 kg parcels, check the actual and volumetric weight, and see which details to verify before approving a Romania shipping quote.",
    "modified": "2026-11-03",
    "intro": ["Two parcels can weigh exactly 2 kg and attract different quotes. Imagine a compact clothing parcel measuring 30 × 20 × 10 cm and a shoe box measuring 40 × 30 × 20 cm. With an illustrative divisor of 6,000, the volumetric weights are 1 and 4 kg. On a route using the greater of actual and volumetric weight, those become 2 and 4 kg before rounding. Check the current line’s own divisor, rounding and declared charges before using the calculation for a real parcel."],
    "summary": "Compare route quotes using the same destination, contents and packed measurements. An estimate or deposit is not automatically the final delivered cost.",
    "table": {
      "caption": "Worked example only: 40 × 30 × 25 cm, actual weight 4 kg",
      "headers": [
        "Illustrative rule",
        "Calculation",
        "Result"
      ],
      "rows": [
        [
          "Volume",
          "40 × 30 × 25",
          "30,000 cm³"
        ],
        [
          "Divisor 6,000",
          "30,000 ÷ 6,000",
          "5 kg volumetric"
        ],
        [
          "Divisor 5,000",
          "30,000 ÷ 5,000",
          "6 kg volumetric"
        ],
        [
          "Billing",
          "Use the selected route’s rules",
          "No live price implied"
        ]
      ]
    },
    "related": ["shipping-expert-romania", "shipping-to-romania", "t-shirt-size-chart-qc"],
    "category": null
  },
  "shipping-to-romania": {
    "summary": "Check Romania route eligibility first, then compare the complete quote. Separate freight, VAT, customs duty and operator charges instead of assuming one price covers everything.",
    "table": {
      "caption": "A Romania quote comparison sheet",
      "headers": [
        "Input",
        "Plan A",
        "Plan B"
      ],
      "rows": [
        [
          "Contents and destination",
          "Same confirmed goods and address",
          "Same confirmed goods and address"
        ],
        [
          "Packing",
          "Record dimensions and weight",
          "Record revised dimensions and weight"
        ],
        [
          "Charges",
          "Mark included, additional or unknown",
          "Use the same cost categories"
        ],
        [
          "Decision",
          "Confirm route restrictions and terms",
          "Compare only an eligible alternative"
        ]
      ]
    },
    "related": [
      "shipping-expert-romania",
      "parcel-cost-guide",
      "tracking-guide"
    ],
    "category": null
  },
  "tracking-guide": {
    "summary": "Match the tracking number to the parcel and carrier. A label, a warehouse dispatch and a carrier acceptance are different events.",
    "table": {
      "caption": "Read the event before deciding the next action",
      "headers": [
        "Event",
        "What it establishes",
        "Useful next check"
      ],
      "rows": [
        [
          "Label created",
          "Electronic shipment record",
          "Confirm physical carrier acceptance"
        ],
        [
          "Carrier accepted",
          "A recorded carrier handoff",
          "Follow the next route milestone"
        ],
        [
          "Customs information requested",
          "More information is required",
          "Verify the request and provide accurate records"
        ],
        [
          "Local partner handoff",
          "Transfer toward final delivery",
          "Use the identified local tracking reference"
        ]
      ]
    },
    "related": [
      "maintenance-orders-romania",
      "shipping-to-romania",
      "shipping-expert-romania"
    ],
    "category": null
  },
  "how-to-order-romania": {
    "summary": "Approve the purchase in stages: listing, variant, warehouse evidence, packing and eligible shipping quote. Keep each decision attached to its own record.",
    "table": {
      "caption": "Complete one decision before authorising the next",
      "headers": [
        "Stage",
        "Check",
        "Record to keep"
      ],
      "rows": [
        [
          "Product",
          "Exact size, colour and quantity",
          "Listing and order confirmation"
        ],
        [
          "Warehouse",
          "Identity, condition and needed measurements",
          "QC images and item ID"
        ],
        [
          "Packing",
          "Accepted contents and protection needs",
          "Approved parcel plan"
        ],
        [
          "Shipping",
          "Eligible route and complete quote",
          "Parcel ID and carrier reference"
        ]
      ]
    },
    "related": [
      "maintenance-orders-romania",
      "spreadsheet-guide",
      "shipping-expert-romania"
    ],
    "category": null
  }
};
