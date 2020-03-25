import axios from 'axios'
import { fetchAll } from './dCandidate';

const baseurl = 'http://localhost:62057/api/';

export default {
    dCandidate(url = baseurl + 'DCandidate/'){
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create : newRecord => axios.post(url , newRecord),
            update : (id,updateRecord) => axios.put(url + id,updateRecord),
            delete : id => axios.delete(url + id)
        }
    }
}