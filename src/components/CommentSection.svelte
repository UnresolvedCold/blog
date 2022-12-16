<script>
import { onMount } from 'svelte'
export let theme;
onMount(() => {
    const s = document.createElement('script')
    const tag = document.getElementById('utterances')
    s.setAttribute('repo',"unresolvedcold/test-repo-1")
    s.setAttribute('issue-term',"pathname")
    s.setAttribute('label',"blog-comments")
    s.setAttribute('theme',theme)
    s.setAttribute('crossorigin',"anonymous")
    s.src = 'https://utteranc.es/client.js'
    tag.parentNode.insertBefore(s, tag)
})
</script>

<div id="utterances"></div>