export class NodeWorker {
  static create(package_name: string) {
    const blob = new Blob(
      [`import Package from "${package_name}";new Package()`],
      {
        type: "application/typescript",
      }
    );
    const url = URL.createObjectURL(blob);
    new Worker(url);
  }
}
