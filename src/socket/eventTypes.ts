enum EventTypes {
  // User
  INVALID_USER_ID = "invalid-user-id",
  // Lobby
  LOBBY_JOINED = "lobby-joined",
  LOBBY_LEFT = "lobby-left",
  CREATE_LOBBY = "create-lobby",
  LOBBY_JOIN_FAILURE = "lobby-join-failure",
  LOBBY_CREATED_SUCCESS = "lobby-created-success",
  PLAYER_LEFT = "player-left",
  INVALID_LOBBY_ID = "invalid-lobby-id",
  LOBBY_DISBANDED = "lobby-disbanded",
  DISBAND_LOBBY = "disband-lobby",
  LOBBY_JOIN_SUCCESS = "lobby-join-success",
  LOBBY_JOIN_ATTEMPT = "lobby-join-attempt",
  // General
  DISCONNECTED = "disconnected",
  USER_CUSTOMIZED = "user-customized",
  // Drawing
  LINE_FINISHED = "line-finished",
  UPDATE_CANVAS = "update-canvas"
}

export default EventTypes;
