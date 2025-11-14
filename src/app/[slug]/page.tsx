import ArticleContent from '@/components/ArticleContent/ArticleContent'; // Import the client component
import getArticleContent from '@/utils/getArticleContent';
import getArticleMetadata from '@/utils/getArticleMetadata';

export const generateStaticParams = async () => {
  const articles = getArticleMetadata('articles');
  return articles.map((article) => ({ slug: article.slug }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return {
    title: `My Blog ${slug.replaceAll('_', '')}`,
  };
};

const ArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  if (!slug) {
    return <div>Article not found</div>;
  }

  const article = getArticleContent('articles/', slug);

  return (
    <ArticleContent
      articleContent={article.content}
      folder="articles"
      loading={false}
      slug={slug}
    />
  );
};

export default ArticlePage;
