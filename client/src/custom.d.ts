declare module "*.svg" {
  // either do this
  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  // or this
  const content: string;
  export default content;
}
