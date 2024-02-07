#!/usr/bin/env python3
import re
import os

images = []

def copy_image_to_dir(image_path, target_directory):
    import shutil
    if not os.path.exists(target_directory):
        os.makedirs(target_directory)
    shutil.copy(image_path, target_directory)

def get_image_imports():
    imports = ''
    for image in images:
        import_statement='import '+image['name']+' from ' +image['url']
        imports = imports + import_statement +'\n'
    return imports+'\n'

def get_frontmatter(metadata):
    frontmatter = "---\n"
    for meta in metadata:
        # print (f"Metadata: {meta}")
        # Remove PROPERTY::
        meta = meta.replace(r"PROPERTY: ", r"")

        key, value = meta.split(" ")[0][2:], meta.split(" ")[1:]
        value = " ".join(value)
        frontmatter += f"{key} {value}\n"
    frontmatter += "---\n"
    return frontmatter

def convert_org_to_mdx(org_content, year, blog_name, org_folder="org"):

    def replace_image(match):
        # New url for image
        original_url = match.group(1)
        original_url = os.path.join(org_folder, original_url)
        new_url = original_url.split("/")[-1]
        new_url = "src/images/posts/"+year+"/"+blog_name+"/"+new_url

        image_name = "Image" + str(len(images))
        print(f"Image URL: {new_url}", image_name)
        images.append({
            "url": new_url,
            "name": image_name
        })

        # Copy image to new location
        copy_image_to_dir(original_url, "src/images/posts/"+year+"/"+blog_name)

        return '<BlogImageWithContext src={{'+image_name+'}} alt="" width="300" aspectRatio="16/9"/>'

    # iterate line wise
    md_content = ""
    frontmatter = ""
    in_code_block = False
    in_result_block = False
    metadata = []

    for org_line in org_content.split("\n"):
        # convert org heading to md heading
        if org_line.startswith("*"):
            md_line = r'#'+re.sub(r"^\*+", lambda x: "#" * len(x.group(0)), org_line)
            md_content += md_line + "\n"

        # Convert code block to md code block
        elif org_line.startswith("#+BEGIN_SRC") or org_line.startswith("#+begin_src"):
            md_content += "```" + org_line.split(" ")[1].split(" ")[0] + "\n"
            in_code_block = True
        elif org_line.startswith("#+END_SRC") or org_line.startswith("#+end_src"):
            md_content += "```\n"
            in_code_block = False
        elif in_code_block:
            md_content += "> "+org_line + "\n"
        # Result block    
        elif org_line.startswith("#+RESULTS:"):
            md_content += "```bash" + "\n"
            in_result_block = True
        elif in_result_block and org_line.startswith(":"):
            md_content += org_line[2:] + "\n"
        elif in_result_block and not org_line.startswith(":"):
            md_content += '```' + "\n"
            in_result_block = False
        elif org_line.startswith("#+"):
            metadata.append(org_line)
        # images, contains .png, .jpg, .jpeg, .gif
        elif re.search(r'\[\[([^\]]+)\]\]', org_line):
            md_content += re.sub(r'\[\[([^\]]+)\]\]', replace_image, org_line) + "\n"
        # Normal line    
        else:
            # Bold
            org_line = re.sub(r"\*(.*?)\*", lambda x: "**" + x.group(1) + "**", org_line)
            # Italic
            org_line = re.sub(r"/(.*?)/", lambda x: "*" + x.group(1) + "*", org_line)
            # Underline
            org_line = re.sub(r"_(.*?)_", lambda x: "<u>" + x.group(1) + "</u>", org_line)
            # Strikethrough
            org_line = re.sub(r"~(.*?)~", lambda x: "~~" + x.group(1) + "~~", org_line)
            # Link
            org_line = re.sub(r"\[\[(.*?)\]\[(.*?)\]\]", lambda x: "[" + x.group(2) + "](" + x.group(1) + ")", org_line)
            # Table
            org_line = re.sub(r"\|", lambda x: " | ", org_line)
            # Checkbox
            org_line = re.sub(r"\[\s\]", lambda x: "- [ ]", org_line)
            org_line = re.sub(r"\[X\]", lambda x: "- [x]", org_line)


            md_content += org_line + "\n"             

    return get_frontmatter(metadata) + get_image_imports() + md_content

def convert_org_files_to_mdx(org_folder, mdx_folder):
    # Ensure mdx folder exists
    os.makedirs(mdx_folder, exist_ok=True)

    # Loop through org files in the org folder
    for org_file_name in os.listdir(org_folder):
        raw_file_name = os.path.splitext(org_file_name)[0]
        print(f"Processing {org_file_name}")
        if org_file_name.endswith(".org"):
            year, month, date = raw_file_name.split("-")[:3]
            blog_file_name = raw_file_name[11:]
            org_file_path = os.path.join(org_folder, org_file_name)
            mdx_file_name = os.path.splitext(org_file_name)[0] + ".mdx"
            mdx_file_path = os.path.join(mdx_folder, mdx_file_name)

            with open(org_file_path, 'r', encoding='utf-8') as org_file:
                org_content = org_file.read()

            mdx_content = convert_org_to_mdx(org_content, year, blog_file_name)

            with open(mdx_file_path, 'w', encoding='utf-8') as mdx_file:
                mdx_file.write(mdx_content)

            print(f"Converted {org_file_name} to {mdx_file_name}")
if __name__ == "__main__":
    org_file_path = "org"
    mdx_file_path = "src/content/blog/"
    if os.path.exists(org_file_path):
        convert_org_files_to_mdx(org_file_path, mdx_file_path)
        print(f"Conversion complete. MDX file saved at: {mdx_file_path}")
    else:
        print(f"Org directory does not exist, skipping.")
