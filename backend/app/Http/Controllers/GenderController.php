<?php

namespace App\Http\Controllers;

use App\Models\Gender;
use Illuminate\Http\Request;

class GenderController extends Controller
{
    public function index()
    {
        return Gender::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:genders',
            'count' => 'integer|min:0',
        ]);

        $gender = Gender::create($validatedData);

        return response()->json($gender, 201);
    }

    public function show(Gender $gender)
    {
        return $gender;
    }

    public function update(Request $request, Gender $gender)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255|unique:genders,name,' . $gender->id,
            'count' => 'integer|min:0',
        ]);

        $gender->update($validatedData);

        return response()->json($gender, 200);
    }

    public function destroy(Gender $gender)
    {
        $gender->delete();

        return response()->json(null, 204);
    }
}
