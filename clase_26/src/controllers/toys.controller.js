import getToysService from '../services/toys.services.js';

const getToys = async () => {
    return await getToysService();
}

export default getToys;