module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'appChamados',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
