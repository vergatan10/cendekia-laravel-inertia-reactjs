<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CategoryController extends Controller
{
    use HasFile;
    public function index(): Response
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'cover', 'created_at'])
            ->when(request()->search, function ($query, $value) {
                $query->whereAny([
                    'name',
                    'slug'
                ], 'REGEXP', $value);
            })
            ->paginate(10);
        return inertia('Admin/Categories/Index', [
            'categories' => CategoryResource::collection($categories)->additional([
                'meta' => [
                    'has_pages' => $categories->hasPages(),
                ]
            ]),
            'page_settings' => [
                'title' => 'Kategori',
                'subtitle' => 'Menampilkan semua data kategori yang tersedia pada platform ini',
            ],
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
            ]
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Categories/Create', [
            'page_settings' => [
                'title' => 'Tambah Kategori',
                'subtitle' => 'Buat Kategori baru di sini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.categories.create'),
            ],
        ]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        try {
            Category::create([
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'description' => $request->description,
                'cover' => $this->upload_file($request, 'cover', 'categories'),
            ]);

            flashMessage(MessageType::CREATED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (\Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            // return back();
            return to_route('admin.categories.index');
        }
    }

    public function edit(Category $category): Response
    {
        return inertia('Admin/Categories/Edit', [
            'page_settings' => [
                'title' => 'Edit Kategori',
                'subtitle' => 'Edit kategori di sini. Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.categories.edit', $category),
            ],
            'category' => $category,
        ]);
    }

    public function update(Category $category, CategoryRequest $request): RedirectResponse
    {
        try {
            $category->update([
                'name' => $name = $request->name,
                'slug' => $name !== $category->name ? str()->lower(str()->slug($name) . str()->random(4)) : $category->slug,
                'description' => $request->description,
                'cover' => $this->update_file($request, $category, 'cover', 'categories'),
            ]);

            flashMessage(MessageType::UPDATED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (\Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.categories.index');
        }
    }

    public function destroy(Category $category): RedirectResponse
    {
        try {
            $this->delete_file($category, 'cover');

            $category->delete();

            flashMessage(MessageType::DELETED->message('Kategori'));
            return to_route('admin.categories.index');
        } catch (\Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.categories.index');
        }
    }
}
