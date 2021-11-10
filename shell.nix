let
  pkgs = import
    (
      fetchTarball {
        name = "21.05";
        url = "https://github.com/NixOS/nixpkgs/archive/7e9b0dff974c89e070da1ad85713ff3c20b0ca97.tar.gz";
        sha256 = "1ckzhh24mgz6jd1xhfgx0i9mijk6xjqxwsshnvq789xsavrmsc36";
      })
    { };

  jupyter = import
    (
      builtins.fetchGit {
        url = https://github.com/tweag/jupyterWith;
        rev = "73bdac9ca036c0303fc3a487129e23f9c4ad0bcf";
      })
    { };
  ipython = jupyter.kernels.iPythonWith {
    name = "stac";
    packages = ipythonPackages: with ipythonPackages; [ jsonschema ];
  };
  jupyterEnvironment =
    jupyter.jupyterlabWith {
      kernels = [ ipython ];
    };
in
pkgs.mkShell {
  buildInputs = [
    jupyterEnvironment
    pkgs.nodejs
    pkgs.yarn
  ];
}
