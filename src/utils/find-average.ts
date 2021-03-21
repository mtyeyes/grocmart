type FindAverage = {
  (source: number[] | number): number;
  (source: undefined | null | string): null;
};

const findAverage: FindAverage = (source: any) => {
  if (Array.isArray(source)) {
    return (
      source.reduce((acc: number, value: number) => acc + value) / source.length
    );
  }
  if (Number.isInteger(source)) {
    return source;
  }
  return null;
};

export default findAverage;
