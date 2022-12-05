[[ -z $1 ]] && exit 1
name=$1
year=$(date +'%Y')
date=$(date +'%b %d, %Y')
git fetch origin
git checkout -b $name origin/draft
mkdir -p src/pages/posts/$year/
new_file="src/pages/posts/$year/$name.mdx"
mkdir -p src/images/posts/$year/$name

echo "---" > $new_file
echo "title: Some Name" >> $new_file
echo "description: Some Description" >> $new_file
echo "pubDate: ${date}" >> $new_file
echo "draft: true" >> $new_file
echo "---" >> $new_file
echo "import BlogImage from '@components/BlogImage.astro'" >> $new_file
echo "import image_target from '@images/posts/${year}/${name}/some-image.ext'" >> $new_file
echo "<BlogImage src={image_target} alt='Beagle Dog by Jules D. on Unsplash' />" >> $new_file

# Result
echo "Starter file generated"