for dir in ./integration/*/
do
    dir=${dir%*/}
    name=${dir##*/}
    echo "Integration test for $name"
    cd $dir
    npm run integration
    cd ../..
done
