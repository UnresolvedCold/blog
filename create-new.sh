[[ -z $1 ]] && exit 1
name=$1
year=$(date +'%Y')
date=$(date +'%b %d, %Y')
file_date=$(date +'%Y-%m-%d')
git fetch origin
git checkout publish
git pull origin publish
git checkout -b blog-$name
new_file="src/content/blog/$file_date-$name.mdx"
mkdir -p src/images/posts/$year/$name

echo "---" > $new_file
echo "title: $name" >> $new_file
echo "description: $name" >> $new_file
echo "ideaDate: $date" >> $new_file
echo "draft: true" >> $new_file
echo "heroImage: /hero-images/default.png" >> $new_file
echo "---" >> $new_file

# Result
echo "Starter file generated!"
echo "Happy Blogging"