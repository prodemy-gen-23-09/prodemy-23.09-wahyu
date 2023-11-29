const mahasiswa1 = {
  nama: "Wahyu Haryo",
  umur: 20,
  prodi: "fisika",
};

const updateMahasiswa1 = {
  domisili: "Kab. Sleman",
  alamat: "Kab. Cilacap",
};

// const a = mahasiswa1;
// a.umur = 23;
// const updateData = { ...mahasiswa1, ...updateMahasiswa1 };
// console.log(updateData);

const damas = [
  {
    nama: "Brian",
    umur: 21,
    prodi: "geofis",
  },
  {
    nama: "Jaka",
    umur: 20,
    prodi: "fisika",
  },
];

// const a = damas[0];
// const b = damas[1];
// a.umur = 23;
// b.umur = 21;
// console.log(damas);

const damas1 = [
  {
    nama: "Sadam",
    umur: 24,
    prodi: "kimia",
  },
];

// Spread Operator
const dataMahasiswa = [...damas, ...damas1];
const a = dataMahasiswa[0];
a.prodi = "matematika";
console.log(dataMahasiswa);

// menambah data nenggunakan push()
damas.push(damas1);
// console.log(damas);
