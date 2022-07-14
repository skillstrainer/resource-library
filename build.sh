# Removing previous files
bash clean.sh

# Building new JS files
NODE_ENV=production babel src/lib --out-dir . --copy-files

# Building new CSS file
postcss ./src/lib/styles.css --dir ./css