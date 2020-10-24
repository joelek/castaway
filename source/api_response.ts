import * as libdb from "./database";
import * as objects from "./api/schema/objects";

type AlbumResponse = {
	album: objects.Album
};

type AlbumsResponse = {
	albums: objects.Album[]
};

type ArtistResponse = {
	artist: objects.Artist,
	appearances: objects.Album[]
};

type ArtistsResponse = {
	artists: objects.Artist[]
};

type DiscResponse = {
	disc: objects.Disc
};

type DiscsResponse = {
	discs: objects.Disc[]
};

type EpisodeResponse = {
	episode: objects.Episode
};

type EpisodesResponse = {
	episodes: objects.Episode[]
};

type GenreResponse = {
	genre: objects.Genre,
	shows: objects.Show[],
	movies: objects.Movie[]
};

type GenresResponse = {
	genres: objects.Genre[]
};

type MovieResponse = {
	movie: objects.Movie,
	suggestions: objects.Movie[]
};

type MoviesResponse = {
	movies: objects.Movie[]
};

type PlaylistResponse = {
	playlist: objects.Playlist
};

type PlaylistsResponse = {
	playlists: objects.Playlist[]
};

type SeasonResponse = {
	season: objects.Season
};

type SeasonsResponse = {
	seasons: objects.Season[]
};

type ShowResponse = {
	show: objects.Show
};

type ShowsResponse = {
	shows: objects.Show[]
};

type TrackResponse = {
	track: objects.Track
};

type TracksResponse = {
	tracks: objects.Track[]
};

type UserResponse = {
	user: objects.User
};

type UsersResponse = {
	users: objects.User[]
};

type SearchResponse = {
	entities: (objects.Album | objects.Artist | objects.Episode | objects.Movie | objects.Show | objects.Track | objects.Playlist)[],
};










interface ApiRequest {

};

interface ApiResponse {

};

interface AuthWithTokenReponse extends ApiResponse {

}

interface AuthRequest extends ApiRequest {
	username: string;
	password: string;
}

interface AuthResponse extends ApiResponse {
	token: string
}

interface CuesRequest extends ApiResponse {
	query: string;
}

interface CuesResponse extends ApiResponse {
	cues: Array<libdb.CueEntry & {
		subtitle: libdb.SubtitleEntry & {
			episode: undefined | (libdb.EpisodeEntry & {
				season: libdb.SeasonEntry & {
					show: libdb.ShowEntry
				}
			}),
			movie_part: undefined | (libdb.MoviePartEntry & {
				movie: libdb.MovieEntry
			})
		}
	}>;
}

interface TokensRequest extends ApiRequest {

}

interface TokensResponse extends ApiResponse {
	tokens: Array<libdb.AuthToken>
}

export {
	AlbumResponse,
	AlbumsResponse,
	ArtistResponse,
	ArtistsResponse,
	DiscResponse,
	DiscsResponse,
	EpisodeResponse,
	EpisodesResponse,
	GenreResponse,
	GenresResponse,
	SeasonResponse,
	SeasonsResponse,
	ShowResponse,
	ShowsResponse,
	MovieResponse,
	MoviesResponse,
	PlaylistResponse,
	PlaylistsResponse,
	TrackResponse,
	TracksResponse,
	UserResponse,
	UsersResponse,
	SearchResponse,



	ApiRequest,
	ApiResponse,
	AuthWithTokenReponse,
	AuthRequest,
	AuthResponse,
	CuesRequest,
	CuesResponse,
	TokensRequest,
	TokensResponse
};
