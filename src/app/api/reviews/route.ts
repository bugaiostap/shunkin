import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Тип для отзыва
interface Review {
    id?: number;
    name: string;
    phone: string;
    message: string;
}

// 🔹 Получить все отзывы
export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM reviews ORDER BY created_at DESC");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при получении отзывов" }, { status: 500 });
    }
}

// 🔹 Добавить отзыв
export async function POST(req: Request) {
    try {
        const { name, phone, message }: Review = await req.json();

        if (!name || !phone || !message) {
            return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

        await pool.query(
            "INSERT INTO reviews (name, phone, message) VALUES (?, ?, ?)",
            [name, phone, message]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при добавлении отзыва" }, { status: 500 });
    }
}

// 🔹 Удалить отзыв
export async function DELETE(req: Request) {
    try {
        const { id }: { id: number } = await req.json();
        await pool.query("DELETE FROM reviews WHERE id = ?", [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при удалении" }, { status: 500 });
    }
}
