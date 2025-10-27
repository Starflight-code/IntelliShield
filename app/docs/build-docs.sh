for file in *.md; do
    pandoc $file -o ${file:0:-3}.pdf -V geometry:"top=1cm, bottom=1.5cm, left=1cm, right=1cm"
done
