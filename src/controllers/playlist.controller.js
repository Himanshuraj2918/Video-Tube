import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist
  if (!name || !description)
    throw new ApiError(400, "Playlist name and descriptions required");

  const playlist = await Playlist.create({
    name,
    description,
    owner: req.user?._id,
  });

  const createPlaylist = await Playlist.findById(playlist._id);

  if (!createPlaylist) throw new ApiError(200, "Something went wrong");

  return res
    .status(200)
    .json(new ApiResponse(200, createPlaylist, "Playlist created..."));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(404, "Not a valid request");
  }

  const playlists = await Playlist.find({ owner: userId });

  if (playlists.length === 0) throw new ApiError(400, "Playlist not exists");

  return res
    .status(200)
    .json(new ApiResponse(200, playlists, "Fetched playlists successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  if (!playlistId || !isValidObjectId(playlistId)) {
    throw new ApiError(404, "Not a valid request");
  }

  const playlist = await Playlist.find({ _id: playlistId });

  if (playlist.length === 0) throw new ApiError(400, "Playlist not exists");

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Fetched playlists successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  if (!playlistId || !isValidObjectId(playlistId)) {
    throw new ApiError(404, "Not a valid request");
  }

   const playlist = await Playlist.findByIdAndDelete(playlistId);
   console.log(playlist);
   
   if(!playlist) throw new ApiError(400,"Playlist not found")

   return res
   .status(200)
   .json(new ApiResponse(200,playlist,"Playlist successfully deleted"))
   

});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!playlistId || !isValidObjectId(playlistId))
    throw new ApiError(400, "Not a valid request");

  if (!name || !description)
    throw new ApiError(400, "Name and description is required");

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        name,
        description,
      },
    },
    {
        new:true
    }
  );
  
  if(!playlist) throw new ApiError(400,"Playlist not found")

  return res
  .status(200)
  .json(new ApiResponse(200,playlist,"Data updated successfully"))


});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
