import http from './http-common';

class TutorialDataService {
  getAll() {
    return http.get('/rooms');
  }

  get(id) {
    return http.get(`/rooms/${id}`);
  }

  create(data) {
    return http.post('/rooms', data);
  }

  update(id, data) {
    return http.put(`/rooms/${id}`, data);
  }

  delete(id) {
    return http.delete(`/rooms/${id}`);
  }

  deleteAll() {
    return http.delete(`/rooms`);
  }

  findByTitle(room) {
    return http.get(`/rooms?room=${room}`);
  }
}

export default new TutorialDataService();
