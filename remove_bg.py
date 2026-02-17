from PIL import Image

def remove_bg(image_path, bg_color, tolerance=30):
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Check if pixel is close to bg_color
            if all(abs(item[i] - bg_color[i]) < tolerance for i in range(3)):
                new_data.append((255, 255, 255, 0)) # Transparent
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(image_path, "PNG")
        print(f"Processed {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

# Light Logo: White background (255, 255, 255)
remove_bg('/Users/jorgearellano1/WebEmpresa/arellano-tech-labs/src/assets/logo-light.png', (255, 255, 255), tolerance=50)

# Dark Logo: Dark background (18, 18, 18) -> #121212
remove_bg('/Users/jorgearellano1/WebEmpresa/arellano-tech-labs/src/assets/logo-dark.png', (18, 18, 18), tolerance=40)
