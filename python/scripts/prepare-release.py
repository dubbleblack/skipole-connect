from pathlib import Path
import shutil

package_root = Path(__file__).resolve().parents[1]
license_source = package_root.parent / "LICENSE"
license_target = package_root / "LICENSE"

if not license_source.is_file():
    raise SystemExit(f"Missing integration package license: {license_source}")

shutil.copyfile(license_source, license_target)
print("Prepared the Apache-2.0 license file for the Python package.")
