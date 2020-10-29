import * as api from "../api/schema/objects";
import * as xnode from "../xnode";
import * as theme from "./theme";
import * as is from "../is";
import { EntityTitleFactory } from "./EntityTitleFactory";
import { EntityLinkFactory } from "./EntityLink";
import { ImageBoxFactory } from "./ImageBox";
import { PlaybackButtonFactory } from "./PlaybackButton";

const CSS = `
	.entity-row {
		align-items: center;
		display: grid;
		gap: 16px;
		grid-template-columns: 60px 1fr;
	}

	.entity-row__artwork {
		border-radius: 2px;
		overflow: hidden;
		position: relative;
	}

	.entity-row__playback {
		position: absolute;
			top: 50%; left: 50%;
		transform: translate(-50%, -50%);
	}

	.entity-row__metadata {
		display: grid;
		gap: 16px;
	}

	.entity-row__titles {
		display: grid;
		gap: 8px;
	}

	.entity-row__title {
		color: ${theme.TEXT_0};
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.entity-row__subtitle {
		color: ${theme.TEXT_1};
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export class EntityRowFactory {
	private entityTitleFactory: EntityTitleFactory;
	private entityLinkFactory: EntityLinkFactory;
	private ImageBox: ImageBoxFactory;
	private PlaybackButton: PlaybackButtonFactory;

	private make(link: xnode.XElement, image: xnode.XElement, playbackButton: xnode.XElement | undefined, titles: xnode.XElement[], subtitles: xnode.XElement[]): xnode.XElement {
		return link.add(xnode.element("div.entity-row")
			.add(xnode.element("div.entity-row__artwork")
				.add(image)
				.add(xnode.element("div.entity-row__playback")
					.add(playbackButton)
				)
			)
			.add(xnode.element("div.entity-row__content")
				.add(xnode.element("div.entity-row__whitespace")
					.add(xnode.text(".".repeat(1000)))
				)
				.add(xnode.element("div.entity-row__metadata")
					.add(xnode.element("div.entity-row__titles")
						.add(xnode.element("div.entity-row__title")
							.add(...xnode.joinarray(titles))
						)
						.add(xnode.element("div.entity-row__subtitle")
							.add(...xnode.joinarray(subtitles))
						)
					)
				)
			)
		);
	}

	constructor(entityTitleFactory: EntityTitleFactory, entityLinkFactory: EntityLinkFactory, ImageBox: ImageBoxFactory, PlaybackButton: PlaybackButtonFactory) {
		this.entityTitleFactory = entityTitleFactory;
		this.entityLinkFactory = entityLinkFactory;
		this.ImageBox = ImageBox;
		this.PlaybackButton = PlaybackButton;
	}

	forEntity(entity: api.Entity): xnode.XElement {
		if (api.Album.is(entity)) {
			return this.forAlbum(entity);
		}
		if (api.Artist.is(entity)) {
			return this.forArtist(entity);
		}
		if (api.Disc.is(entity)) {
			return this.forDisc(entity);
		}
		if (api.Episode.is(entity)) {
			return this.forEpisode(entity);
		}
		if (api.Person.is(entity)) {
			return this.forPerson(entity);
		}
		if (api.Playlist.is(entity)) {
			return this.forPlaylist(entity);
		}
		if (api.Movie.is(entity)) {
			return this.forMovie(entity);
		}
		if (api.Season.is(entity)) {
			return this.forSeason(entity);
		}
		if (api.Show.is(entity)) {
			return this.forShow(entity);
		}
		if (api.Track.is(entity)) {
			return this.forTrack(entity);
		}
		if (api.User.is(entity)) {
			return this.forUser(entity);
		}
		throw `Expected code to be unreachable!`;
	}

	forAlbum(album: api.Album, playbackButton: xnode.XElement = this.PlaybackButton.forAlbum(album)): xnode.XElement {
		let duration_ms = 0;
		for (let disc of album.discs) {
			for (let track of disc.tracks) {
				duration_ms += track.segment.file.duration_ms;
			}
		}
		let link = this.entityLinkFactory.forAlbum(album);
		let image = this.ImageBox.forSquare(is.absent(album.artwork) ? undefined : `/files/${album.artwork.file_id}/`);
		let titles = [
			this.entityTitleFactory.forAlbum(album)
		];
		let subtitles = album.artists.map((artist) => this.entityTitleFactory.forArtist(artist));
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forArtist(artist: api.Artist, playbackButton: xnode.XElement = this.PlaybackButton.forArtist(artist)): xnode.XElement {
		let duration_ms = 0;
		for (let album of artist.albums) {
			for (let disc of album.discs) {
				for (let track of disc.tracks) {
					duration_ms += track.segment.file.duration_ms;
				}
			}
		}
		let link = this.entityLinkFactory.forArtist(artist);
		let image = this.ImageBox.forSquare();
		let titles = [
			this.entityTitleFactory.forArtist(artist)
		];
		let subtitles = new Array<xnode.XElement>();
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forDisc(disc: api.Disc, playbackButton: xnode.XElement = this.PlaybackButton.forDisc(disc)): xnode.XElement {
		let duration_ms = 0;
		for (let track of disc.tracks) {
			duration_ms += track.segment.file.duration_ms;
		}
		let link = this.entityLinkFactory.forDisc(disc);
		let image = this.ImageBox.forSquare(is.absent(disc.album.artwork) ? undefined : `/files/${disc.album.artwork.file_id}/`);
		let titles = [
			this.entityTitleFactory.forAlbum(disc.album),
			this.entityTitleFactory.forDisc(disc)
		];
		let subtitles = disc.album.artists.map((artist) => this.entityTitleFactory.forArtist(artist));
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forEpisode(episode: api.Episode, playbackButton: xnode.XElement = this.PlaybackButton.forEpisode(episode)): xnode.XElement {
		let duration_ms = 0;
		duration_ms += episode.segment.file.duration_ms;
		let link = this.entityLinkFactory.forEpisode(episode);
		let image = this.ImageBox.forVideo(`/media/stills/${episode.segment.file.file_id}/`);
		let titles = [
			this.entityTitleFactory.forEpisode(episode)
		];
		let subtitles = [
			this.entityTitleFactory.forShow(episode.season.show),
			this.entityTitleFactory.forSeason(episode.season)
		];
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forMovie(movie: api.Movie, playbackButton: xnode.XElement = this.PlaybackButton.forMovie(movie)): xnode.XElement {
		let duration_ms = 0;
		duration_ms += movie.segment.file.duration_ms;
		let link = this.entityLinkFactory.forMovie(movie);
		let image = this.ImageBox.forPoster(is.absent(movie.artwork) ? undefined : `/files/${movie.artwork.file_id}/`);
		let titles = [
			this.entityTitleFactory.forMovie(movie)
		];
		let subtitles = movie.genres.map((genre) => this.entityTitleFactory.forGenre(genre));
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forPerson(person: api.Person): xnode.XElement {
		let link = this.entityLinkFactory.forPerson(person);
		let image = this.ImageBox.forSquare();
		let titles = [
			this.entityTitleFactory.forPerson(person)
		];
		let subtitles = [] as xnode.XElement[];
		return this.make(link, image, undefined, titles, subtitles);
	}

	forPlaylist(playlist: api.Playlist, playbackButton: xnode.XElement = this.PlaybackButton.forPlaylist(playlist)): xnode.XElement {
		let duration_ms = 0;
		for (let item of playlist.items) {
			duration_ms += item.track.segment.file.duration_ms;
		}
		let link = this.entityLinkFactory.forPlaylist(playlist);
		let image = this.ImageBox.forSquare();
		let titles = [
			this.entityTitleFactory.forPlaylist(playlist)
		];
		let subtitles = [
			this.entityTitleFactory.forUser(playlist.user)
		];
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forSeason(season: api.Season, playbackButton: xnode.XElement = this.PlaybackButton.forSeason(season)): xnode.XElement {
		let duration_ms = 0;
		for (let episode of season.episodes) {
			duration_ms += episode.segment.file.duration_ms;
		}
		let link = this.entityLinkFactory.forSeason(season);
		let image = this.ImageBox.forPoster(is.absent(season.show.artwork) ? undefined : `/files/${season.show.artwork.file_id}/`);
		let titles = [
			this.entityTitleFactory.forShow(season.show),
			this.entityTitleFactory.forSeason(season)
		];
		let subtitles = season.show.genres.map((genre) => this.entityTitleFactory.forGenre(genre));
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forShow(show: api.Show, playbackButton: xnode.XElement = this.PlaybackButton.forShow(show)): xnode.XElement {
		let duration_ms = 0;
		for (let season of show.seasons) {
			for (let episode of season.episodes) {
				duration_ms += episode.segment.file.duration_ms;
			}
		}
		let link = this.entityLinkFactory.forShow(show);
		let image = this.ImageBox.forPoster(is.absent(show.artwork) ? undefined : `/files/${show.artwork.file_id}/`);
		let titles = [
			this.entityTitleFactory.forShow(show)
		];
		let subtitles = show.genres.map((genre) => this.entityTitleFactory.forGenre(genre));
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forTrack(track: api.Track, playbackButton: xnode.XElement = this.PlaybackButton.forTrack(track)): xnode.XElement {
		let duration_ms = 0;
		duration_ms += track.segment.file.duration_ms;
		let link = this.entityLinkFactory.forTrack(track);
		let image = this.ImageBox.forSquare(is.absent(track.disc.album.artwork) ? undefined : `/files/${track.disc.album.artwork.file_id}/`);
		let titles = [
			this.entityTitleFactory.forTrack(track)
		];
		let subtitles = [
			...track.artists.map((artist) => this.entityTitleFactory.forArtist(artist)),
			this.entityTitleFactory.forAlbum(track.disc.album)
		];
		return this.make(link, image, playbackButton, titles, subtitles);
	}

	forUser(user: api.User): xnode.XElement {
		let link = this.entityLinkFactory.forUser(user);
		let image = this.ImageBox.forSquare();
		let titles = [
			this.entityTitleFactory.forUser(user)
		];
		let subtitles = [
			xnode.element("span").add(xnode.text(user.username))
		];
		return this.make(link, image, undefined, titles, subtitles);
	}

	static makeStyle(): xnode.XElement {
		return xnode.element("style")
			.add(xnode.text(CSS));
	}
};
