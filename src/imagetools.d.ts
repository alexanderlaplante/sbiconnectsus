// Type declarations for vite-imagetools query imports
declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}

declare module "*&as=picture" {
  const picture: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default picture;
}
