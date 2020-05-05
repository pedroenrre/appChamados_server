module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gerenciadorContas',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
