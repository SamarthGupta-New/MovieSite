const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const GernreIds = selectedGenres.map((g) => g.id);
  return GernreIds.reduce((acc, curr) => acc + "," + curr);
};
export default useGenres;
