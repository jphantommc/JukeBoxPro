import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistsByTrackId } from "#db/queries/playlists_tracks";
import requireUser from "#middleware/requireUser";

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

router.route("/:id").get(( req, res) => {
  res.send(req.track); 
});

router.route("/:id/playlists").get(requireUser, async (req, res) => {
  const playlists = await getPlaylistsByTrackId(req.params.id);
  if (!playlists) return res.status(404).send("No playlists found for this track.");
  res.send(playlists);
});