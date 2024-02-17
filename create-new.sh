[[ -z $1 ]] && exit 1
name=$1
year=$(date +'%Y')
date=$(date +'%b %d, %Y')
file_date=$(date +'%Y-%m-%d')
git fetch origin
git checkout publish
git pull origin publish
git checkout -b blog-$name
new_file="org/$file_date-$name.org"
mkdir -p org/images

echo "#+title: $name" > $new_file
echo "#+AUTHOR: John Doe" >> $new_file
echo "#+DATE: $file_date" >> $new_file
echo "#+PROPERTY: description: $name" >> $new_file
echo "#+PROPERTY: draft: true" >> $new_file
# Enable this to get a hero image
# echo "#+PROPERTY: heroImage: /hero-images/default.png" >> $new_file
echo "#+PROPERTY: ideaDate: $date" >> $new_file
echo "" >> $new_file
echo "* Introduction" >> $new_file

# Result
echo "Starter file generated!"
echo "Happy Blogging"
