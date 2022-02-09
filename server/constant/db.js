const DB_USER = "simon";
const DB_PASSWORD = "nomis";
const DB_NAME = "contact_mern";
const CLUSTER_HOST = "cluster0.7ixsl.mongodb.net";

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = {DB_URI};
