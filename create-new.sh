[[ -z $1 ]] && exit 1
name=$1
year=$(date +'%Y')
date=$(date +'%b %d, %Y')
git fetch origin
git checkout publish
git pull origin publish
git checkout -b blog-$name
mkdir -p src/pages/posts/$year/
new_file="src/pages/posts/$year/$name.mdx"
mkdir -p src/images/posts/$year/$name

echo "import BlogImage from '@components/BlogImage.astro'" >> $new_file
echo "---" > $new_file
echo "title: Some Name" >> $new_file
echo "description: Some Description" >> $new_file
echo "ideaDate: $date" >> $new_file
echo "---" >> $new_file

# Result
echo "Starter file generated!"
echo "Happy Blogging"