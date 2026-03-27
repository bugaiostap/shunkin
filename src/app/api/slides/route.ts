import { NextResponse } from "next/server";
import pool from "@/lib/db";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
});

// Тип для слайда
interface Slide {
    id?: number;
    title: string;
    area: string;
    rooms: string;
    offer: string;
    address: string;
    images: string[];
}

// 🔹 Получить все слайды
export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM slides");
        const slides = (rows as any[]).map((slide) => ({
            ...slide,
            images: JSON.parse(slide.images),
        }));
        return NextResponse.json(slides);
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при получении слайдов" }, { status: 500 });
    }
}

// 🔹 Добавить слайд
export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const area = formData.get("area") as string;
        const rooms = formData.get("rooms") as string;
        const address = formData.get("address") as string;
        const offer = formData.get("offer") as string;
        const files = formData.getAll("images") as File[];

        const uploadedUrls: string[] = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const key = `property-photos/${Date.now()}-${file.name}`;

            const uploadResult = await s3
                .upload({
                    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
                    Key: key,
                    Body: buffer,
                    ContentType: file.type,
                })
                .promise();

            uploadedUrls.push(uploadResult.Location);
        }

        const [result] = await pool.query(
            "INSERT INTO slides (title, area, rooms, address, images ,offer) VALUES (?, ?, ?, ?, ?, ?)",
            [title, area, rooms, address, JSON.stringify(uploadedUrls), offer]
        );

        return NextResponse.json({ id: (result as any).insertId, title, area, rooms, address, images: uploadedUrls });
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при добавлении" }, { status: 500 });
    }
}

// 🔹 Удалить слайд
export async function DELETE(req: Request) {
    try {
        const { id }: { id: number } = await req.json();
        await pool.query("DELETE FROM slides WHERE id = ?", [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при удалении" }, { status: 500 });
    }
}
