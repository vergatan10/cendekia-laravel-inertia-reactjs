import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconBook } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Edit(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        title: props.book.title,
        author: props.book.author,
        publication_year: props.book.publication_year ?? null,
        isbn: props.book.isbn,
        language: props.book.language ?? null,
        synopsis: props.book.synopsis,
        number_of_pages: props.book.number_of_pages,
        cover: null,
        price: props.book.price,
        category_id: props.book.category_id ?? null,
        publisher_id: props.book.publisher_id ?? null,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);
    const onHandleChangeFile = (e) => setData(e.target.name, e.target.files[0]);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    const onHandleReset = () => {
        reset();
        fileInputCover.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBook}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.books.index')}>
                        <IconArrowLeft className="size-4">Kembali</IconArrowLeft>
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="title">Judul</Label>
                            <Input
                                name="title"
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={onHandleChange}
                                placeholder="Masukkan judul..."
                            />
                            {errors.title && <InputError message={errors.title} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="author">Penulis</Label>
                            <Input
                                name="author"
                                id="author"
                                type="text"
                                value={data.author}
                                onChange={onHandleChange}
                                placeholder="Masukkan penulis..."
                            />
                            {errors.author && <InputError message={errors.author} />}
                        </div>
                        {/* select tahun terbit */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="publication_year">Tahun terbit</Label>
                            <Select
                                defaultValue={data.publication_year}
                                onValueChange={(value) => setData('publication_year', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.page_data.publicationYears.find(
                                            (publication_year) => publication_year === data.publication_year,
                                        ) ?? 'Pilih tahun terbit'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.publicationYears.map((publication_year, index) => (
                                        <SelectItem key={index} value={publication_year}>
                                            {publication_year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.publication_year && <InputError message={errors.publication_year} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="isbn">ISBN (International Standard Book Number)</Label>
                            <Input
                                name="isbn"
                                id="isbn"
                                type="text"
                                value={data.isbn}
                                onChange={onHandleChange}
                                placeholder="Masukkan ISBN..."
                            />
                            {errors.isbn && <InputError message={errors.isbn} />}
                        </div>

                        {/* select bahasa */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="language">Bahasa</Label>
                            <Select defaultValue={data.language} onValueChange={(value) => setData('language', value)}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.page_data.language.find((language) => language.value === data.language)
                                            ?.label ?? 'Pilih bahasa'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.language.map((language, index) => (
                                        <SelectItem key={index} value={language.value}>
                                            {language.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.language && <InputError message={errors.language} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="synopsis">Sinopsis</Label>
                            <Textarea
                                name="synopsis"
                                id="synopsis"
                                onChange={onHandleChange}
                                placeholder="Masukkan sinopsis..."
                                value={data.synopsis}
                            ></Textarea>
                            {errors.synopsis && <InputError message={errors.synopsis} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="number_of_pages">Jumlah Halaman</Label>
                            <Input
                                name="number_of_pages"
                                id="number_of_pages"
                                type="number"
                                value={data.number_of_pages}
                                onChange={onHandleChange}
                                placeholder="Masukkan jumlah halaman..."
                            />
                            {errors.number_of_pages && <InputError message={errors.number_of_pages} />}
                        </div>
                        {/* price */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cover">Cover</Label>
                            <Input
                                name="cover"
                                id="cover"
                                ref={fileInputCover}
                                onChange={onHandleChangeFile}
                                type="file"
                            />
                            {errors.cover && <InputError message={errors.cover} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="price">Harga</Label>
                            <Input
                                name="price"
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={onHandleChange}
                                placeholder="Masukkan harga..."
                            />
                            {errors.price && <InputError message={errors.price} />}
                        </div>

                        {/* select kategori */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="category_id">Kategori</Label>
                            <Select
                                defaultValue={data.category_id}
                                onValueChange={(value) => setData('category_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.page_data.categories.find(
                                            (category) => category.value === data.category_id,
                                        )?.label ?? 'Pilih Kategori'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.categories.map((category, index) => (
                                        <SelectItem key={index} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <InputError message={errors.category_id} />}
                        </div>

                        {/* select penerbit */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="publisher_id">Penerbit</Label>
                            <Select
                                defaultValue={data.publisher_id}
                                onValueChange={(value) => setData('publisher_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.page_data.publishers.find(
                                            (publisher) => publisher.value === data.publisher_id,
                                        )?.label ?? 'Pilih Penerbit'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.publishers.map((publisher, index) => (
                                        <SelectItem key={index} value={publisher.value}>
                                            {publisher.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.publisher_id && <InputError message={errors.publisher_id} />}
                        </div>

                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="orange" size="lg" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
