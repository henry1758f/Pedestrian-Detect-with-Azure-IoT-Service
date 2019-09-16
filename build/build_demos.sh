#!/usr/bin/env bash
setupvars_path=/opt/intel/openvino/bin/setupvars.sh
if [ -e "$ROOT_DIR/../../bin/setupvars.sh" ]; then
    setupvars_path="$ROOT_DIR/../../bin/setupvars.sh"
else
    printf "Error: setupvars.sh is not found\n"
fi
if ! . $setupvars_path ; then
    printf "Unable to run ./setupvars.sh. Please check its presence. ${run_again}"
    exit 1
fi
source $setupvars_path

printf "Build Inference Engine demos\n\n"

demos_path="../"

if ! command -v cmake &>/dev/null; then
    printf "\n\nCMAKE is not installed. It is required to build Inference Engine demos. Please install it. ${run_again}"
    exit 1
fi

OS_PATH=$(uname -m)
NUM_THREADS="-j8"

if [ $OS_PATH == "x86_64" ]; then
  OS_PATH="intel64"
  NUM_THREADS="-j8"
fi

build_dir="../synnex_demo_build"
if [ -e $build_dir/CMakeCache.txt ]; then
	rm -rf $build_dir/CMakeCache.txt
fi
mkdir -p $build_dir
cd $build_dir
cmake -DCMAKE_BUILD_TYPE=Release $demos_path
make -lstdc++fs $NUM_THREADS
