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
import { IconArrowLeft, IconUsersGroup } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const fileInputAvatar = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null,
        gender: '',
        date_of_birth: '',
        address: '',
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
        fileInputAvatar.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconUsersGroup}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.users.index')}>
                        <IconArrowLeft className="size-4">Kembali</IconArrowLeft>
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={onHandleChange}
                                placeholder="Masukkan nama..."
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                id="email"
                                type="text"
                                value={data.email}
                                onChange={onHandleChange}
                                placeholder="Masukkan email..."
                            />
                            {errors.email && <InputError message={errors.email} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={onHandleChange}
                                placeholder="Masukkan password..."
                            />
                            {errors.password && <InputError message={errors.password} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password_confirmation">Konfirmasi Password_confirmation</Label>
                            <Input
                                name="password_confirmation"
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={onHandleChange}
                                placeholder="Masukkan konfirmasi password..."
                            />
                            {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="phone">Nomor Handphone</Label>
                            <Input
                                name="phone"
                                id="phone"
                                type="text"
                                value={data.phone}
                                onChange={onHandleChange}
                                placeholder="Masukkan nomor handphone..."
                            />
                            {errors.phone && <InputError message={errors.phone} />}
                        </div>

                        {/* gender selection */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="gender">Jenis Kelamin</Label>
                            <Select defaultValue={data.gender} onValueChange={(value) => setData('gender', value)}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.genders.find((gender) => gender.value === data.gender)?.label ??
                                            'Pilih Jenis Kelamin'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.genders.map((gender, index) => (
                                        <SelectItem key={index} value={gender.value}>
                                            {gender.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.gender && <InputError message={errors.gender} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                name="address"
                                id="address"
                                value={data.address}
                                onChange={onHandleChange}
                                placeholder="Masukkan alamat..."
                            ></Textarea>
                            {errors.address && <InputError message={errors.address} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cover">Cover</Label>
                            <Input
                                name="cover"
                                id="cover"
                                ref={fileInputAvatar}
                                onChange={onHandleChangeFile}
                                type="file"
                            />
                            {errors.cover && <InputError message={errors.cover} />}
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

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
