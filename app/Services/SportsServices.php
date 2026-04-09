<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SportsServices
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.sportsdb.key');
        $this->baseUrl = config('services.sportsdb.base_url');
    }

    //Menampilkan data liga
    public function getLeagues()
    {
        return Http::get("{$this->baseUrl}/{$this->apiKey}/search_all_leagues.php?s=Soccer")
            ->json();
    }

    //Menampilkan data Tim
    public function getTeams($league)
    {
        return Http::get("{$this->baseUrl}/{$this->apiKey}/search_all_teams.php", [
            'l' => $league
        ])->json();
    }

    //Menampilkan data pertandingan
    public function getMatches($teamId)
    {

        //Previous Match
        $last = Http::get("{$this->baseUrl}/{$this->apiKey}/eventslast.php", [
            'id' => $teamId
        ])->json();

        $teamData = $this->getTeamFromMatch($teamId, $last);

        //Mengambil id liga dari tim
        $leagueId = $last['results'][0]['idLeague'] ?? null;

        //Data klasemen
        $standing = [];
        if ($leagueId) {
            $standing = Http::get("{$this->baseUrl}/{$this->apiKey}/lookuptable.php", [
                'l' => $leagueId,
                's' => '2024-2025'
            ])->json();
        }

        return [
            'team' => $teamData,
            'matches' => $last['results'] ?? [],
            'standings' => $standing['table'] ?? null,
        ];
    }

    private function getTeamFromMatch($teamId, $last)
    {
        if (!empty($last['results'][0])) {
            $match = $last['results'][0];

            // Jika tim adalah home
            if ($match['idHomeTeam'] == $teamId) {
                return [
                    'strTeam' => $match['strHomeTeam'],
                    'strBadge' => $match['strHomeTeamBadge'] ?? null,
                    'strLeague' => $match['strLeague']
                ];
            }

            // Jika tim adalah away
            return [
                'strTeam' => $match['strAwayTeam'],
                'strBadge' => $match['strAwayTeamBadge'] ?? null,
                'strLeague' => $match['strLeague']
            ];
        }

        return null;
    }
}
