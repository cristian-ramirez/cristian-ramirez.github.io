import ArticleCard from '@/components/ArticleCard/ArticleCard';
import getArticleMetadata from '@/utils/getArticleMetadata';

export default function Home() {
  const articleMetadata = getArticleMetadata('articles');
  const sortedArticles = articleMetadata.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="postsContainer">
      {sortedArticles.map((article, i) => {
        return <ArticleCard key={i} article={article}></ArticleCard>;
      })}
    </main>
  );
}
