"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_API_KEY_RESEND!);

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  customerEmail: string;
}

interface Patient {
  fullName: string;
}

interface Order {
  id: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  patient?: Patient;
  items: OrderItem[];
}

export async function POST(req: Request) {
  try {
    const order: Order = await req.json();

    const { data, error } = await resend.emails.send({
      from: "DeepEyeX <deepeyex@resend.dev>",
      to: order.shippingAddress?.customerEmail,
      subject: `Hóa đơn đơn hàng #${order.id}`,
      html: `
        <h2>Xin chào ${order.patient?.fullName || "Quý khách"},</h2>
        <p>Cảm ơn bạn đã đặt hàng tại <b>DeepEyeX</b>.</p>
        <p><b>Mã đơn hàng:</b> ${order.id}</p>
        <p><b>Tổng tiền:</b> ${order.totalAmount.toLocaleString("vi-VN")}₫</p>
        <h3>Chi tiết sản phẩm:</h3>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.name} - ${item.quantity} x ${item.price.toLocaleString("vi-VN")}₫</li>`,
            )
            .join("")}
        </ul>
        <p>Trân trọng,<br/>DeepEyeX</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ success: false, error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Send email failed:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
