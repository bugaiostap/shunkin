"use client";
import { useEffect, useRef, useState } from "react";

// Тип для слайда
interface Slide {
    id: number;
    title: string;
    area: string;
    rooms: string;
    address: string;
    offer: string;
    images: string[];
}

// 🔒 Хардкодим пароль
const ADMIN_PASSWORD = "sa8f2l1sgsd;g@R#RT:EWGnDSG";
interface Review {
    id: number;
    name: string;
    phone: string;
    message: string;
}
export default function AdminPage() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [title, setTitle] = useState("");
    const [area, setArea] = useState("");
    const [rooms, setRooms] = useState("");
    const [address, setAddress] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // Ошибки
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const fetchReviews = async () => {
        try {
            const res = await fetch("/api/reviews");
            if (!res.ok) throw new Error("Ошибка загрузки отзывов");
            const data = await res.json();
            setReviews(data);
        } catch (err) {
            setError("Не удалось загрузить отзывы.");
        } finally {
            setLoading(false);
        }
    };

    // Удаление отзыва
    const deleteReview = async (id: number) => {
        const res = await fetch("/api/reviews", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            setReviews(reviews.filter((r) => r.id !== id));
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        // ✅ Проверяем куки при загрузке
        const cookies = document.cookie.split("; ");
        const hasPassword = cookies.some((cookie) => cookie.startsWith("admin_password=" + ADMIN_PASSWORD));

        if (hasPassword) {
            setIsAuthenticated(true);
            fetchSlides();
        }
    }, []);

    // ✅ Фетч слайдов
    const fetchSlides = async () => {
        const res = await fetch("/api/slides");
        const data = await res.json();
        setSlides(data);
    };

    // ✅ Авторизация
    const handleLogin = (password: string) => {
        if (password === ADMIN_PASSWORD) {
            document.cookie = `admin_password=${ADMIN_PASSWORD}; path=/; max-age=86400`; // Кука на 1 день
            setIsAuthenticated(true);
            fetchSlides();
        } else {
            setError("Неверный пароль");
        }
    };

    // ✅ Обработка выбора файлов + предпросмотр
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages(files);
            setImagePreviews(files.map((file) => URL.createObjectURL(file)));
        }
    };

    const [offer, setOffer] = useState("продаж");
    // ✅ Добавление слайда
    const addSlide = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !area || !rooms || !address || images.length === 0) {
            setError("Все поля обязательны");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("area", area);
        formData.append("rooms", rooms);
        formData.append("address", address);
        formData.append("offer", offer);
        images.forEach((image) => formData.append("images", image));

        const res = await fetch("/api/slides", { method: "POST", body: formData });

        if (res.ok) {
            const slide = await res.json();
            setSlides([...slides, slide]);
            setTitle("");
            setArea("");
            setRooms("");
            setAddress("");
            setImages([]);
            setImagePreviews([]);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }

        setLoading(false);
    };

    // ✅ Удаление слайда
    const deleteSlide = async (id: number) => {
        const res = await fetch("/api/slides", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) setSlides(slides?.filter((s) => s.id !== id));
    };

    // ✅ Если не авторизован – показываем форму входа
    if (!isAuthenticated) {
        return (
            <div className="flex flex-col font-gotham items-center justify-center h-screen bg-white text-black">
                <h1 className="text-2xl font-bold mb-4">Вход в админку</h1>
                <input
                    type="password"
                    placeholder="Введите пароль"
                    className="border p-2 w-80 text-black"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin((e.target as HTMLInputElement).value)}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        );
    }

    return (
        <div className="p-6 font-gotham">
            <h1 className="text-2xl font-bold">Admin Panel</h1>

            {/* Форма добавления слайдов */}
            <form onSubmit={addSlide} className="mt-4 space-y-3">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" className="border p-2 w-full" />
                <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Площадь недвижимости" className="border p-2 w-full" />
                <input value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder="Кол-во комнат и санузлов" className="border p-2 w-full" />
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес" className="border p-2 w-full" />
                <select
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    className="border p-2 w-full bg-white text-black"
                >
                    <option value="продаж">Продаж</option>
                    <option value="оренда">Оренда</option>
                </select>
                <input type="file" multiple onChange={handleFileChange} className="border p-2 w-full" ref={fileInputRef} />

                {/* Превью загружаемых картинок */}
                {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {imagePreviews.map((src, index) => (
                            <img key={index} src={src} alt="preview" className="w-20 h-20 rounded-lg object-cover" />
                        ))}
                    </div>
                )}

                <button className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
                    {loading ? "Загрузка..." : "Добавить"}
                </button>
            </form>

            {/* Таблица загруженных слайдов */}
            <ul className="mt-6 space-y-2">
                {slides.length > 0 && slides?.map((slide) => (
                    <li key={slide.id} className="border p-4 flex justify-between items-center">
                        <div>
                            <h2 className="font-bold">{slide.title}</h2>
                            <p>{slide.area} | {slide.rooms} | {slide.address}</p>

                            {/* Превью загруженных изображений */}
                            {slide.images.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {slide.images.map((url, index) => (
                                        <img key={index} src={url} alt="slide image" className="w-20 h-20 rounded-lg object-cover" />
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={() => deleteSlide(slide.id)} className="text-red-500">Удалить</button>
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-bold mb-4 mt-10">Отзывы</h2>

            {loading && <p className="text-gray-500">Загрузка...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <ul className="space-y-2">
                {reviews.map((review) => (
                    <li key={review.id} className="border p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">Имя - {review.name}</h3>
                            <p className="">Номер телефона - {review.phone}</p>
                            <p>Отзыв - {review.message}</p>
                        </div>
                        <button onClick={() => deleteReview(review.id)} className="text-red-500">
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div >
    );
}
