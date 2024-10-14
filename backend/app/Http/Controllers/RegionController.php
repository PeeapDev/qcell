<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function index()
    {
        return Region::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:regions',
            'count' => 'integer|min:0',
        ]);

        $region = Region::create($validatedData);

        return response()->json($region, 201);
    }

    public function show(Region $region)
    {
        return $region;
    }

    public function update(Request $request, Region $region)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255|unique:regions,name,' . $region->id,
            'count' => 'integer|min:0',
        ]);

        $region->update($validatedData);

        return response()->json($region, 200);
    }

    public function destroy(Region $region)
    {
        $region->delete();

        return response()->json(null, 204);
    }
}
