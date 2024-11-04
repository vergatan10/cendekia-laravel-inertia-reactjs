import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Toaster } from '@/Components/ui/toaster';
import { Head, Link } from '@inertiajs/react';
import {
    IconAlertCircle,
    IconBooks,
    IconBuildingCommunity,
    IconCategory,
    IconChartDots2,
    IconCircleKey,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconDashboard,
    IconKeyframe,
    IconLayoutKanban,
    IconLogout,
    IconMoneybag,
    IconRoute,
    IconSettingsExclamation,
    IconStack3,
    IconUser,
    IconUsersGroup,
    IconVersions,
} from '@tabler/icons-react';

const AppLayout = ({ title, children }) => {
    return (
        <>
            <Head title={title} />
            <Toaster position="top-center" richColors />
            <div className="flex flex-row w-full min-h-screen">
                <div className="hidden w-1/5 border-r lg:block">
                    <div className="flex flex-col h-full min-h-screen gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <ApplicationLogo />
                        </div>
                        <div className="flex-1">
                            {/* sidebar */}
                            <nav className="grid items-start px-2 text-sm font-semibold lg:px-4">
                                <div className="px-2 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                                <NavLink url="#" title="Dashboard" icon={IconDashboard} />

                                <div className="px-2 py-2 text-sm font-semibold text-foreground">Statistik</div>
                                <NavLink url="#" title="Statistik Peminjaman" icon={IconChartDots2} />
                                <NavLink url="#" title="Laporan Denda" icon={IconMoneybag} />
                                <NavLink url="#" title="Laporan Stok Buku" icon={IconStack3} />

                                <div className="px-2 py-2 text-sm font-semibold text-foreground">Master</div>
                                <NavLink url="#" title="Kategori" icon={IconCategory} />
                                <NavLink url="#" title="Penerbit" icon={IconBuildingCommunity} />
                                <NavLink url="#" title="Buku" icon={IconBooks} />
                                <NavLink url="#" title="Pengguna" icon={IconUsersGroup} />
                                <NavLink url="#" title="Pengaturan Denda" icon={IconSettingsExclamation} />

                                <div className="px-2 py-2 text-sm font-semibold text-foreground">Peran dan Izin</div>
                                <NavLink url="#" title="Peran" icon={IconCircleKey} />
                                <NavLink url="#" title="Izin" icon={IconVersions} />
                                <NavLink url="#" title="Tetapkan Izin" icon={IconKeyframe} />
                                <NavLink url="#" title="Tetapkan Peran" icon={IconLayoutKanban} />
                                <NavLink url="#" title="Akses Rute" icon={IconRoute} />

                                <div className="px-2 py-2 text-sm font-semibold text-foreground">Transaksi</div>
                                <NavLink url="#" title="Peminjaman" icon={IconCreditCardPay} />
                                <NavLink url="#" title="Pengembalian" icon={IconCreditCardRefund} />

                                <div className="px-2 py-2 text-sm font-semibold text-foreground">Lainnya</div>
                                <NavLink url="#" title="Pengumuman" icon={IconAlertCircle} />
                                <NavLink url={route('profile.edit')} title="Profile" icon={IconUser} />
                                <NavLink url="#" title="Logout" icon={IconLogout} />
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-4/5">
                    <header className="flex h-12 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:justify-end lg:px-6">
                        {/* sidebar responsive */}
                        {/* dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex gap-x-2">
                                    <span>Hi, Verga Tandika</span>
                                    <Avatar>
                                        <AvatarFallback>V</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="#">Logout</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="w-full">
                        <div className="relative">
                            <div
                                className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
                                aria-hidden="true"
                            >
                                <div
                                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-100 to-orange-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                    }}
                                />
                            </div>
                        </div>
                        <div className="gap-4 p-4 lg:gap-6">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AppLayout;
