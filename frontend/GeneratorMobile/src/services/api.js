import axios from "axios";

// ⚠️ Android Emulator = 10.0.2.2
// ⚠️ Téléphone réel = IP de ton PC (ex: 192.168.x.x)

const api = axios.create({
  baseURL: "http://192.168.1.137:5000/api"
});

export default api;