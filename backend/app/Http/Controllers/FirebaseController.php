<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Database;

class FirebaseController extends Controller
{
    protected $database;

    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    public function getData($path)
    {
        $reference = $this->database->getReference($path);
        $snapshot = $reference->getSnapshot();
        $value = $snapshot->getValue();

        return response()->json($value);
    }

    public function setData(Request $request, $path)
    {
        $data = $request->all();
        $reference = $this->database->getReference($path);
        $reference->set($data);

        return response()->json(['message' => 'Data set successfully']);
    }

    public function pushData(Request $request, $path)
    {
        $data = $request->all();
        $reference = $this->database->getReference($path);
        $newPost = $reference->push($data);

        return response()->json(['message' => 'Data pushed successfully', 'key' => $newPost->getKey()]);
    }
}
