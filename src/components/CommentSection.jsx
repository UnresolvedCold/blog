import Giscus from '@giscus/react';

export default function CommentSection({theme}) {
  return (
    <Giscus
      id="comments"
      repo="unresolvedcold/test-repo-1"
      repoId="R_kgDOIm2RAw"
      category="Show and tell"
      categoryId="DIC_kwDOIm2RA84CTIEN"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}    
      lang="en"
      loading="lazy"
    />
  );
}
