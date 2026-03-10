import * as Print from "expo-print";
import { Invoice } from "@/types/invoice";
import { Client } from "@/types/client";

export async function generateInvoicePDF(
  invoice: Invoice,
  client: Client
) {
  const currency = invoice.currency ?? "USD";
  const fmt = (amountInCents: number) =>
    `${(amountInCents / 100).toFixed(2)} ${currency}`;

  const rows = invoice.items
    .map((item) => {
      const lineTotal = item.quantity * item.unitPrice;
      return `
        <tr>
          <td>${item.description || "-"}</td>
          <td class="right">${item.quantity}</td>
          <td class="right">${fmt(item.unitPrice)}</td>
          <td class="right strong">${fmt(lineTotal)}</td>
        </tr>
      `;
    })
    .join("");

  const html = `
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #0f172a;
          margin: 24px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        .brand {
          font-size: 26px;
          font-weight: 800;
          color: #6366f1;
          margin: 0 0 4px;
        }
        .meta, .muted {
          color: #64748b;
          font-size: 12px;
          margin: 0;
        }
        .title {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
        }
        .badge {
          display: inline-block;
          margin-top: 6px;
          background: #e0e7ff;
          color: #4338ca;
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 700;
        }
        .section {
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 16px;
          background: #ffffff;
        }
        .section-title {
          margin: 0 0 8px;
          font-size: 13px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        th, td {
          padding: 10px 8px;
          border-bottom: 1px solid #e2e8f0;
        }
        th {
          text-align: left;
          color: #64748b;
          font-weight: 700;
          font-size: 12px;
        }
        .right { text-align: right; }
        .strong { font-weight: 700; }
        .totals {
          margin-left: auto;
          width: 280px;
        }
        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-size: 13px;
        }
        .total-final {
          border-top: 1px solid #cbd5e1;
          margin-top: 6px;
          padding-top: 8px;
          font-size: 16px;
          font-weight: 800;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <p class="brand">KULIPA</p>
          <p class="meta">Facturation moderne</p>
        </div>
        <div style="text-align:right;">
          <p class="title">Facture #${invoice.id}</p>
          <span class="badge">${invoice.status.toUpperCase()}</span>
          <p class="meta" style="margin-top:8px;">Emission: ${invoice.issuedAt}</p>
          <p class="meta">Echeance: ${invoice.dueDate}</p>
        </div>
      </div>

      <div class="grid">
        <div class="section">
          <p class="section-title">Client</p>
          <p style="margin:0;font-weight:700;">${client.name}</p>
          <p class="muted">${client.email}</p>
          <p class="muted">${client.phone ?? "-"}</p>
        </div>
        <div class="section">
          <p class="section-title">Paiement</p>
          <p style="margin:0;font-weight:700;">Devise: ${currency}</p>
          <p class="muted">Taxe: ${(invoice.taxRate * 100).toFixed(0)}%</p>
          <p class="muted">Reference: INV-${invoice.id}</p>
        </div>
      </div>

      <div class="section">
        <p class="section-title">Details</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="right">Qte</th>
              <th class="right">Prix unit.</th>
              <th class="right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <div class="totals">
        <div class="totals-row"><span>Sous-total</span><span>${fmt(invoice.subtotal)}</span></div>
        <div class="totals-row"><span>Taxe</span><span>${fmt(invoice.taxAmount)}</span></div>
        <div class="totals-row total-final"><span>Total</span><span>${fmt(invoice.total)}</span></div>
      </div>
    </body>
  </html>`;

  const { uri } = await Print.printToFileAsync({ html });
  return uri;
}
