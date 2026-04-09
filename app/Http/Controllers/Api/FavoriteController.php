<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FavoriteTeam;

class FavoriteController extends Controller
{

    //Menampilkan data 
    public function index(Request $request)
    {
        return $request->user()->favorites;
    }

    //Menambahkan favorit
    public function store(Request $request)
    {
        $request->validate([
            'team_id' => 'required',
            'team_name' => 'required'
        ]);

        $exist = FavoriteTeam::where('user_id', $request->user()->id)
            ->where('team_id', $request->team_id)
            ->first();

        if ($exist) {
            return response()->json([
                'message' => 'Team already in favorites'
            ], 409);
        }

        return FavoriteTeam::create([
            'user_id' => $request->user()->id,
            'team_id' => $request->team_id,
            'team_name' => $request->team_name,
            'team_badge' => $request->team_badge,
        ]);
    }

    //Menghapus data
    public function destroy(Request $request, $id)
    {
        $favorite = FavoriteTeam::where('id_favorite_team', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $favorite->delete();

        return response()->json([
            'message' => 'Deleted.',
        ]);
    }
}
