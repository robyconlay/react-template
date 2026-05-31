type HeadProps = {
  title?: string;
  description?: string;
};

/**
 * Sets the document title and meta description for a route. React 19 hoists
 * `<title>` and `<meta>` rendered anywhere in the tree up into `<head>`, so no
 * helmet library is needed — render <Head /> from a layout or route component.
 */
export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  const fullTitle = title ? `${title} | React Template` : 'React Template';

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
    </>
  );
};
