export class EDSData {
    
    constructor(
        public activeEntityId: number,
        public breadcrumbIds: number[],
        public newDocumentIds: number[],
        public newIdCountHolder: number
    ){}
}