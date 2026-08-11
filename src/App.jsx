import { useMemo, useState } from "react";

const regions = [
  ["IN", "印度", "Chandra Dragon"],
  ["PK", "巴基斯坦", "Moon Dragon"],
  ["ID", "印尼", "Naga Bulan"],
  ["BD", "孟加拉", "চন্দ্র ড্রাগন"],
  ["PH", "菲律宾", "Moon Dragon"],
  ["AR", "阿拉伯", "تنين القمر"],
  ["TR", "土耳其", "Ay Ejderhası"],
  ["BR", "巴西", "Dragão Lunar"],
];

const pets = [
  {
    id: "PET-001",
    name: "月曜龙",
    grade: "SS",
    cover: "moon-1-thumbnail.webp",
    resource: "12/12",
    updated: "2026-07-30 18:42",
  },
  {
    id: "PET-002",
    name: "潮汐鲸",
    grade: "S",
    cover: "tide-1-thumbnail.png",
    resource: "8/12",
    updated: "2026-07-29 16:15",
  },
  {
    id: "PET-003",
    name: "棉云兔",
    grade: "A",
    cover: "cloud-1-thumbnail.webp",
    resource: "12/12",
    updated: "2026-07-25 10:08",
  },
  {
    id: "PET-004",
    name: "曜金狮",
    grade: "SSS",
    cover: "gold-1-thumbnail.png",
    resource: "4/12",
    updated: "2026-07-22 21:30",
  },
];

const eggs = [
  {
    id: "EGG-SS-001",
    grade: "SS",
    cover: "pet-egg-ss.png",
    hatching: "pet-egg-ss-hatching.mp4",
    petIds: ["PET-001", "PET-002"],
    pets: "月曜龙、潮汐鲸",
    petCount: 2,
    updated: "2026-07-30 18:55",
  },
  {
    id: "EGG-S-001",
    grade: "S",
    cover: "pet-egg-s.png",
    hatching: "pet-egg-s-hatching.webp",
    petIds: ["PET-002", "PET-003"],
    pets: "潮汐鲸、棉云兔",
    petCount: 2,
    updated: "2026-07-28 14:20",
  },
  {
    id: "EGG-SSS-001",
    grade: "SSS",
    cover: "pet-egg-sss.png",
    hatching: "pet-egg-sss-hatching.mp4",
    petIds: ["PET-004"],
    pets: "曜金狮",
    petCount: 1,
    updated: "2026-07-26 11:10",
  },
];

const initialRechargeActivities = [
  {
    key: "PET_RECHARGE_MONTHLY",
    name: "充值送宠物",
    tiers: [
      {
        id: "TIER-01",
        threshold: 1000,
        rewards: [{ eggId: "EGG-S-001", quantity: 1 }],
      },
      {
        id: "TIER-02",
        threshold: 1700,
        rewards: [{ eggId: "EGG-SS-001", quantity: 1 }],
      },
    ],
    updated: "2026-08-11 10:30",
  },
];

const userPets = [
  {
    id: "UPET-10293847-001",
    userId: "10293847",
    nickname: "XXXX Days",
    petId: "PET-001",
    name: "月曜龙",
    grade: "SS",
    star: 2,
    level: 42,
    experience: 40000,
    nextExperience: 68000,
    carried: true,
    updated: "2026-08-03 18:22",
  },
  {
    id: "UPET-10293847-002",
    userId: "10293847",
    nickname: "XXXX Days",
    petId: "PET-001",
    name: "月曜龙",
    grade: "SS",
    star: 1,
    level: 12,
    experience: 8600,
    nextExperience: 12000,
    carried: false,
    updated: "2026-08-02 13:46",
  },
  {
    id: "UPET-88756021-001",
    userId: "88756021",
    nickname: "Luna Voice",
    petId: "PET-002",
    name: "潮汐鲸",
    grade: "S",
    star: 3,
    level: 68,
    experience: 93200,
    nextExperience: 108000,
    carried: true,
    updated: "2026-08-01 21:08",
  },
  {
    id: "UPET-77018432-001",
    userId: "77018432",
    nickname: "Cloudy",
    petId: "PET-003",
    name: "棉云兔",
    grade: "A",
    star: 1,
    level: 8,
    experience: 4200,
    nextExperience: 7000,
    carried: false,
    updated: "2026-07-31 17:35",
  },
  {
    id: "UPET-66021985-001",
    userId: "66021985",
    nickname: "Golden Mic",
    petId: "PET-004",
    name: "曜金狮",
    grade: "SSS",
    star: 2,
    level: 36,
    experience: 32000,
    nextExperience: 48000,
    carried: true,
    updated: "2026-07-30 11:16",
  },
];

const initialEggAcquisitionRecords = [
  {
    id: "EGR-20260805-0001",
    userId: "10293847",
    nickname: "XXXX Days",
    eggId: "EGG-SS-001",
    grade: "SS",
    cover: "pet-egg-ss.png",
    quantity: 1,
    source: "活动领取",
    sourceDetail: "月度累计充值 $1,000",
    operator: "系统自动发送",
    acquiredAt: "2026-08-05 20:18",
  },
  {
    id: "EGR-20260804-0008",
    userId: "88756021",
    nickname: "Luna Voice",
    eggId: "EGG-S-001",
    grade: "S",
    cover: "pet-egg-s.png",
    quantity: 1,
    source: "活动领取",
    sourceDetail: "月度累计充值 $1,700",
    operator: "系统自动发送",
    acquiredAt: "2026-08-04 22:06",
  },
  {
    id: "EGR-20260803-0012",
    userId: "77018432",
    nickname: "Cloudy",
    eggId: "EGG-SS-001",
    grade: "SS",
    cover: "pet-egg-ss.png",
    quantity: 2,
    source: "后台发送",
    sourceDetail: "活动奖励补发",
    operator: "运营管理员",
    acquiredAt: "2026-08-03 16:42",
  },
  {
    id: "EGR-20260802-0006",
    userId: "66021985",
    nickname: "Golden Mic",
    eggId: "EGG-SSS-001",
    grade: "SSS",
    cover: "pet-egg-sss.png",
    quantity: 1,
    source: "后台发送",
    sourceDetail: "用户奖励补发",
    operator: "运营管理员",
    acquiredAt: "2026-08-02 11:30",
  },
];

const formResources = [
  {
    star: "一星",
    level: "初始形态",
    thumbnail: "moon-1-thumbnail.webp",
    clientIdle: "moon-1-idle.mp4",
    clientInteract: "moon-1-interact.mp4",
    h5Idle: "moon-1-idle.webp",
    h5Interact: "moon-1-interact.webp",
  },
  {
    star: "二星",
    level: "30",
    thumbnail: "moon-2-thumbnail.webp",
    clientIdle: "moon-2-idle.mp4",
    clientInteract: "moon-2-interact.mp4",
    h5Idle: "moon-2-idle.webp",
    h5Interact: "moon-2-interact.webp",
  },
  {
    star: "三星",
    level: "50",
    thumbnail: "moon-3-thumbnail.webp",
    clientIdle: "moon-3-idle.mp4",
    clientInteract: "moon-3-interact.mp4",
    h5Idle: "moon-3-idle.webp",
    h5Interact: "moon-3-interact.webp",
  },
];

function generateEggId(grade) {
  const prefix = `EGG-${grade}-`;
  const nextSequence =
    eggs.reduce((max, item) => {
      if (!item.id.startsWith(prefix)) return max;
      const sequence = Number(item.id.slice(prefix.length));
      return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
    }, 0) + 1;
  return `${prefix}${String(nextSequence).padStart(3, "0")}`;
}

function UploadField({
  title,
  file,
  accept = "WebP / MP4",
  onFileChange,
}) {
  const [fileName, setFileName] = useState(file);
  const inputAccept =
    accept === "PNG"
      ? ".png"
      : accept === "WebP"
        ? ".webp"
        : accept === "MP4"
          ? ".mp4"
        : accept === "PNG / WebP"
          ? ".png,.webp"
          : ".webp,.mp4";
  return (
    <label className="upload-field">
      <span className="upload-title">{title}</span>
      <span className="upload-file">{fileName || "点击上传资源"}</span>
      <span className="upload-meta">
        支持 {accept} · 尺寸与文件大小待确认
      </span>
      <input
        type="file"
        accept={inputAccept}
        onChange={(event) => {
          const nextFileName = event.target.files?.[0]?.name || fileName;
          setFileName(nextFileName);
          onFileChange?.(nextFileName);
        }}
      />
    </label>
  );
}

function PetDrawer({ mode, pet, onClose, onSaved }) {
  const [section, setSection] = useState("base");
  const [name, setName] = useState(pet?.name || "");
  const [grade, setGrade] = useState(pet?.grade || "S");
  const [localNames, setLocalNames] = useState(
    Object.fromEntries(regions.map(([code, , value]) => [code, value])),
  );
  const [error, setError] = useState("");

  const save = () => {
    if (!name.trim()) {
      setSection("base");
      setError("请填写宠物名称");
      return;
    }
    if (Object.values(localNames).some((value) => !value.trim())) {
      setSection("locale");
      setError("请补全全部用户区域的宠物名称");
      return;
    }
    setError("");
    onSaved(mode === "create" ? "宠物已创建并保存" : "宠物配置已保存");
  };

  return (
    <>
      <div className="mask" onClick={onClose} />
      <aside className="drawer" aria-label="宠物编辑抽屉">
        <header className="drawer-head">
          <div>
            <p className="eyebrow">{mode === "create" ? "新建宠物" : pet.id}</p>
            <h2>{mode === "create" ? "新建宠物配置" : `编辑 ${pet.name}`}</h2>
            <p>未保存修改离开时需要二次确认</p>
          </div>
          <button className="text-btn" onClick={onClose}>
            关闭
          </button>
        </header>

        <nav className="drawer-tabs" aria-label="配置分组">
          {[
            ["base", "基础信息"],
            ["locale", "多语言名称"],
            ["forms", "形态资源"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={section === key ? "active" : ""}
              onClick={() => setSection(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="drawer-body">
          {section === "base" && (
            <section className="form-section">
              <div className="section-title">
                <h3>基础信息</h3>
                <p>用于配置宠物名称和品级；展示封面读取对应形态缩略图。</p>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="pet-name">宠物名称 *</label>
                  <input
                    id="pet-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="请输入默认宠物名称"
                  />
                  <small>默认名称用于后台识别；客户端按用户区域读取多语言名称。</small>
                </div>
                <div className="field half-field">
                  <label htmlFor="pet-grade">宠物品级 *</label>
                  <select
                    id="pet-grade"
                    value={grade}
                    onChange={(event) => setGrade(event.target.value)}
                  >
                    <option>A</option>
                    <option>S</option>
                    <option>SS</option>
                    <option>SSS</option>
                  </select>
                </div>
                <div className="impact-note">
                  品级变更会影响宠物蛋关联和客户端品级展示，保存前请确认影响范围。
                </div>
              </div>
            </section>
          )}

          {section === "locale" && (
            <section className="form-section">
              <div className="section-title">
                <h3>多语言名称</h3>
                <p>按用户区域配置名称；缺失时保存会提示补充。</p>
              </div>
              <div className="locale-list">
                {regions.map(([code, region]) => (
                  <div className="locale-row" key={code}>
                    <span className="region-code">{code}</span>
                    <label htmlFor={`locale-${code}`}>{region}</label>
                    <input
                      id={`locale-${code}`}
                      value={localNames[code]}
                      onChange={(event) =>
                        setLocalNames({
                          ...localNames,
                          [code]: event.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {section === "forms" && (
            <section className="form-section">
              <div className="section-title">
                <h3>三星形态资源</h3>
                <p>
                  形态按进化等级解锁；每个形态分别配置客户端 MP4 与 H5 WebP 资源。
                </p>
              </div>
              <div className="form-resource-list">
                {formResources.map((item, index) => (
                  <article className="form-resource" key={item.star}>
                    <div className="form-resource-head">
                      <div>
                        <strong>{item.star}形态</strong>
                        <span>{index === 0 ? "初始展示" : "达到等级后解锁"}</span>
                      </div>
                      <div className="level-input">
                        <label htmlFor={`level-${index}`}>进化等级</label>
                        <input
                          id={`level-${index}`}
                          defaultValue={item.level}
                          disabled={index === 0}
                        />
                      </div>
                    </div>
                    <div className="resource-grid">
                      <UploadField
                        title="封面缩略图 *"
                        file={item.thumbnail}
                        accept="PNG / WebP"
                      />
                      <div className="resource-platform-heading">
                        <strong>客户端资源</strong>
                        <span>仅支持 MP4</span>
                      </div>
                      <UploadField
                        title="客户端待机资源 *"
                        file={item.clientIdle}
                        accept="MP4"
                      />
                      <UploadField
                        title="客户端互动资源 *"
                        file={item.clientInteract}
                        accept="MP4"
                      />
                      <div className="resource-platform-heading">
                        <strong>H5 资源</strong>
                        <span>仅支持 WebP</span>
                      </div>
                      <UploadField
                        title="H5 待机资源 *"
                        file={item.h5Idle}
                        accept="WebP"
                      />
                      <UploadField
                        title="H5 互动资源 *"
                        file={item.h5Interact}
                        accept="WebP"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {error && <div className="form-error">{error}</div>}
        </div>

        <footer className="drawer-foot">
          <span>保存后将更新宠物配置</span>
          <div>
            <button className="btn" onClick={onClose}>
              取消
            </button>
            <button className="btn primary" onClick={save}>
              保存配置
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}

function EggDrawer({ egg, mode, onClose, onSaved }) {
  const [grade, setGrade] = useState(egg?.grade || "S");
  const [coverFile, setCoverFile] = useState(egg?.cover || "");
  const [hatchingFile, setHatchingFile] = useState(egg?.hatching || "");
  const [selectedPetIds, setSelectedPetIds] = useState(
    new Set(egg?.petIds || []),
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerKeyword, setPickerKeyword] = useState("");
  const [pickerGrade, setPickerGrade] = useState("全部");
  const [pendingPetIds, setPendingPetIds] = useState(new Set());
  const [error, setError] = useState("");
  const eggId = egg?.id || generateEggId(grade);

  const selectedPetItems = pets.filter((item) => selectedPetIds.has(item.id));
  const filteredPickerPets = pets.filter(
    (item) =>
      (!pickerKeyword ||
        `${item.id}${item.name}${item.cover}`
          .toLowerCase()
          .includes(pickerKeyword.toLowerCase())) &&
      (pickerGrade === "全部" || item.grade === pickerGrade),
  );

  const openPicker = () => {
    setPickerKeyword("");
    setPickerGrade("全部");
    setPendingPetIds(new Set());
    setPickerOpen(true);
  };

  const togglePendingPet = (petId) => {
    const next = new Set(pendingPetIds);
    if (next.has(petId)) next.delete(petId);
    else next.add(petId);
    setPendingPetIds(next);
  };

  const bindPets = () => {
    setSelectedPetIds(
      new Set([...selectedPetIds, ...Array.from(pendingPetIds)]),
    );
    setPickerOpen(false);
    setPendingPetIds(new Set());
    setError("");
  };

  const removePet = (petId) => {
    const next = new Set(selectedPetIds);
    next.delete(petId);
    setSelectedPetIds(next);
  };

  const save = () => {
    if (!coverFile) {
      setError("请上传宠物蛋封面（静态 PNG）");
      return;
    }
    if (!hatchingFile) {
      setError("请上传蛋孵化中的动态资源");
      return;
    }
    if (!selectedPetIds.size) {
      setError("至少关联 1 个已配置宠物");
      return;
    }
    onSaved(
      mode === "create"
        ? `宠物蛋已创建，ID：${eggId}`
        : "宠物蛋配置已保存",
    );
  };

  return (
    <>
      <div className="mask" onClick={onClose} />
      <aside className="drawer egg-drawer" aria-label="宠物蛋编辑抽屉">
        <header className="drawer-head">
          <div>
            <p className="eyebrow">
              {mode === "create" ? "NEW PET EGG" : "PET EGG"}
            </p>
            <h2>{mode === "create" ? "新建宠物蛋配置" : "编辑宠物蛋配置"}</h2>
            <p>配置静态蛋封面、孵化中动态资源、品级和关联宠物池。</p>
          </div>
          <button className="text-btn" onClick={onClose}>
            关闭
          </button>
        </header>
        <div className="drawer-body">
          <section className="form-section">
            <div className="section-title">
              <h3>宠物蛋资源</h3>
              <p>蛋封面为静态 PNG；蛋孵化中为动态 WebP 或 MP4。</p>
            </div>
            <div className="form-grid">
              <div className="egg-resource-grid">
                <UploadField
                  title="蛋封面（静态）*"
                  file={coverFile}
                  accept="PNG"
                  onFileChange={setCoverFile}
                />
                <UploadField
                  title="蛋孵化中（动态）*"
                  file={hatchingFile}
                  accept="WebP / MP4"
                  onFileChange={setHatchingFile}
                />
              </div>
              <div className="field half-field">
                <label htmlFor="egg-grade">宠物蛋品级 *</label>
                <select
                  id="egg-grade"
                  value={grade}
                  onChange={(event) => setGrade(event.target.value)}
                >
                  <option>A</option>
                  <option>S</option>
                  <option>SS</option>
                  <option>SSS</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="section-title section-title-action">
              <div>
                <h3>已关联宠物</h3>
                <p>
                  用户孵化时从已关联宠物中随机获得。
                </p>
              </div>
              <button className="btn primary" onClick={openPicker}>
                添加关联宠物
              </button>
            </div>
            <div className="bound-pet-list">
              {selectedPetItems.length ? (
                selectedPetItems.map((petItem) => (
                  <div className="bound-pet-row" key={petItem.id}>
                  <span className={`grade grade-${petItem.grade}`}>
                    {petItem.grade}
                  </span>
                  <span>
                    <strong>{petItem.name}</strong>
                    <small>
                      {petItem.id} · {petItem.cover}
                    </small>
                  </span>
                    <button
                      className="remove-btn"
                      onClick={() => removePet(petItem.id)}
                    >
                      移除
                    </button>
                  </div>
                ))
              ) : (
                <div className="bound-empty">
                  <strong>暂未关联宠物</strong>
                  <p>点击“添加关联宠物”，从全部宠物配置中选择绑定。</p>
                </div>
              )}
            </div>
            <p className="selected-summary">
              当前已关联 {selectedPetItems.length} 个宠物
            </p>
          </section>
          {error && <div className="form-error">{error}</div>}
        </div>
        <footer className="drawer-foot">
          <span>保存后关联宠物池变更将影响后续孵化结果</span>
          <div>
            <button className="btn" onClick={onClose}>
              取消
            </button>
            <button className="btn primary" onClick={save}>
              保存配置
            </button>
          </div>
        </footer>
      </aside>

      {pickerOpen && (
        <>
          <div className="picker-mask" onClick={() => setPickerOpen(false)} />
          <section
            className="picker-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="添加关联宠物"
          >
            <header className="picker-head">
              <div>
                <p className="eyebrow">PET CONFIGURATION</p>
                <h3>添加关联宠物</h3>
                <p>实时读取宠物配置列表，选择后绑定到当前宠物蛋。</p>
              </div>
              <button className="text-btn" onClick={() => setPickerOpen(false)}>
                关闭
              </button>
            </header>

            <div className="picker-toolbar">
              <div className="field">
                <label htmlFor="picker-keyword">关键词</label>
                <input
                  id="picker-keyword"
                  value={pickerKeyword}
                  onChange={(event) => setPickerKeyword(event.target.value)}
                  placeholder="搜索宠物名称 / ID / 资源文件"
                />
              </div>
              <div className="field">
                <label htmlFor="picker-grade">品级</label>
                <select
                  id="picker-grade"
                  value={pickerGrade}
                  onChange={(event) => setPickerGrade(event.target.value)}
                >
                  <option>全部</option>
                  <option>A</option>
                  <option>S</option>
                  <option>SS</option>
                  <option>SSS</option>
                </select>
              </div>
            </div>

            <div className="picker-source">
              <span>数据来源：宠物配置</span>
              <strong>共 {pets.length} 条</strong>
            </div>

            <div className="picker-table-wrap">
              {filteredPickerPets.length ? (
                <table className="picker-table">
                  <thead>
                    <tr>
                      <th className="picker-check-col">选择</th>
                      <th>宠物ID</th>
                      <th>宠物</th>
                      <th>品级</th>
                      <th>形态资源</th>
                      <th>更新时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPickerPets.map((petItem) => {
                      const alreadyBound = selectedPetIds.has(petItem.id);
                      return (
                        <tr key={petItem.id}>
                          <td>
                            {alreadyBound ? (
                              <span className="bound-label">已关联</span>
                            ) : (
                              <input
                                type="checkbox"
                                aria-label={`选择 ${petItem.name}`}
                                checked={pendingPetIds.has(petItem.id)}
                                onChange={() => togglePendingPet(petItem.id)}
                              />
                            )}
                          </td>
                          <td className="id-cell">{petItem.id}</td>
                          <td>
                            <strong>{petItem.name}</strong>
                            <small className="block muted">
                              {petItem.cover}
                            </small>
                          </td>
                          <td>
                            <span className={`grade grade-${petItem.grade}`}>
                              {petItem.grade}
                            </span>
                          </td>
                          <td>
                            <span
                              className={
                                petItem.resource === "12/12"
                                  ? "complete"
                                  : "incomplete"
                              }
                            >
                              {petItem.resource}
                            </span>
                          </td>
                          <td className="muted">{petItem.updated}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="picker-empty">
                  <strong>没有符合条件的宠物配置</strong>
                  <p>请调整关键词或品级筛选。</p>
                </div>
              )}
            </div>

            <footer className="picker-foot">
              <span>已选择 {pendingPetIds.size} 个待添加宠物</span>
              <div>
                <button className="btn" onClick={() => setPickerOpen(false)}>
                  取消
                </button>
                <button
                  className="btn primary"
                  disabled={!pendingPetIds.size}
                  onClick={bindPets}
                >
                  确认添加
                </button>
              </div>
            </footer>
          </section>
        </>
      )}
    </>
  );
}

function EggGrantPage({ onSent }) {
  const [activeTab, setActiveTab] = useState("send");
  const [userId, setUserId] = useState("");
  const [eggId, setEggId] = useState(eggs[0].id);
  const [quantity, setQuantity] = useState(1);
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [records, setRecords] = useState(initialEggAcquisitionRecords);
  const [recordKeyword, setRecordKeyword] = useState("");
  const [recordSource, setRecordSource] = useState("全部");
  const selectedEgg = eggs.find((item) => item.id === eggId) || eggs[0];
  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const searchableText = `${record.id}${record.userId}${record.nickname}${record.eggId}${record.cover}${record.sourceDetail}${record.operator}`;
        return (
          (!recordKeyword ||
            searchableText.toLowerCase().includes(recordKeyword.toLowerCase())) &&
          (recordSource === "全部" || record.source === recordSource)
        );
      }),
    [recordKeyword, recordSource, records],
  );

  const prepareSend = () => {
    const normalizedUserId = userId.trim();
    const numericQuantity = Number(quantity);

    if (!normalizedUserId) {
      setError("请填写接收宠物蛋的用户ID");
      return;
    }
    if (!Number.isInteger(numericQuantity) || numericQuantity < 1 || numericQuantity > 99) {
      setError("发送数量需为 1–99 的整数");
      return;
    }

    setError("");
    setConfirmOpen(true);
  };

  const confirmSend = () => {
    const now = new Date();
    const recordIdTime = now
      .toISOString()
      .replace(/\D/g, "")
      .slice(0, 14);
    const acquiredAt = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(now)
      .replaceAll("/", "-");

    setRecords((current) => [
      {
        id: `EGR-${recordIdTime}`,
        userId: userId.trim(),
        nickname: "后台指定用户",
        eggId: selectedEgg.id,
        grade: selectedEgg.grade,
        cover: selectedEgg.cover,
        quantity: Number(quantity),
        source: "后台发送",
        sourceDetail: remark.trim() || "运营后台手动发送",
        operator: "运营管理员",
        acquiredAt,
      },
      ...current,
    ]);
    setConfirmOpen(false);
    onSent(
      `已向用户 ${userId.trim()} 发送 ${quantity} 枚 ${selectedEgg.grade} 级宠物蛋`,
    );
    setUserId("");
    setQuantity(1);
    setRemark("");
    setActiveTab("records");
  };

  const resetRecordFilters = () => {
    setRecordKeyword("");
    setRecordSource("全部");
  };

  return (
    <>
      <section className="panel grant-panel">
        <div className="panel-head">
          <div>
            <h2>宠物蛋发送管理</h2>
            <p>发送宠物蛋，并统一查询活动领取和后台发送的获得记录。</p>
          </div>
        </div>
        <nav className="grant-tabs" aria-label="宠物蛋发送管理分组">
          <button
            className={activeTab === "send" ? "active" : ""}
            onClick={() => setActiveTab("send")}
          >
            发送宠物蛋
          </button>
          <button
            className={activeTab === "records" ? "active" : ""}
            onClick={() => setActiveTab("records")}
          >
            宠物蛋获得记录
          </button>
        </nav>

        {activeTab === "send" ? (
          <div className="grant-body">
            <section className="grant-section">
              <div className="section-title">
                <h3>目标用户</h3>
                <p>宠物蛋将直接进入该用户的宠物蛋背包。</p>
              </div>
              <div className="grant-user-grid">
                <div className="field">
                  <label htmlFor="grant-user-id">用户ID *</label>
                  <input
                    id="grant-user-id"
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                    placeholder="请输入用户ID"
                  />
                </div>
                <div className="field">
                  <label htmlFor="grant-quantity">发送数量 *</label>
                  <input
                    id="grant-quantity"
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="grant-section">
              <div className="section-title">
                <h3>选择宠物蛋</h3>
                <p>数据来源于宠物蛋配置，发送时使用当前配置资源。</p>
              </div>
              <div className="egg-option-list">
                {eggs.map((item) => (
                  <label
                    className={`egg-option ${eggId === item.id ? "selected" : ""}`}
                    key={item.id}
                  >
                    <input
                      type="radio"
                      name="grant-egg"
                      value={item.id}
                      checked={eggId === item.id}
                      onChange={() => setEggId(item.id)}
                    />
                    <span className="file-thumb">PNG</span>
                    <span className="egg-option-main">
                      <strong>{item.cover}</strong>
                      <small>
                        {item.id} · 关联 {item.petCount} 个宠物
                      </small>
                    </span>
                    <span className={`grade grade-${item.grade}`}>
                      {item.grade}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section className="grant-section">
              <div className="field">
                <label htmlFor="grant-remark">发送备注</label>
                <textarea
                  id="grant-remark"
                  value={remark}
                  onChange={(event) => setRemark(event.target.value)}
                  placeholder="选填，用于说明本次发送原因"
                />
              </div>
            </section>

            <div className="impact-note">
              发送成功后，宠物蛋会立即进入用户的宠物蛋背包，并生成一条后台发送记录。
            </div>
            {error && <div className="form-error">{error}</div>}

            <div className="grant-actions">
              <button className="btn primary" onClick={prepareSend}>
                发送宠物蛋
              </button>
            </div>
          </div>
        ) : (
          <div className="record-section">
            <div className="record-filters">
              <div className="field search-field">
                <label htmlFor="record-keyword">关键词</label>
                <input
                  id="record-keyword"
                  value={recordKeyword}
                  onChange={(event) => setRecordKeyword(event.target.value)}
                  placeholder="搜索记录ID / 用户ID / 宠物蛋ID / 获得说明"
                />
              </div>
              <div className="field">
                <label htmlFor="record-source">获得方式</label>
                <select
                  id="record-source"
                  value={recordSource}
                  onChange={(event) => setRecordSource(event.target.value)}
                >
                  <option>全部</option>
                  <option>活动领取</option>
                  <option>后台发送</option>
                </select>
              </div>
              <div className="filter-actions">
                <button className="btn" onClick={resetRecordFilters}>
                  重置
                </button>
                <button className="btn primary">查询</button>
              </div>
            </div>

            <div className="record-summary">
              <div>
                <strong>宠物蛋获得记录</strong>
                <p>仅记录成功进入用户宠物蛋背包的结果。</p>
              </div>
              <span className="total">共 {filteredRecords.length} 条</span>
            </div>

            {filteredRecords.length ? (
              <div className="table-wrap record-table-wrap">
                <table className="record-table">
                  <thead>
                    <tr>
                      <th>获得记录ID</th>
                      <th>用户</th>
                      <th>宠物蛋奖励</th>
                      <th>数量</th>
                      <th>获得方式</th>
                      <th>获得时间</th>
                      <th>发送方</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id}>
                        <td className="id-cell">{record.id}</td>
                        <td>
                          <strong>{record.nickname}</strong>
                          <small className="block muted">
                            用户ID {record.userId}
                          </small>
                        </td>
                        <td>
                          <div className="object-cell">
                            <span className="file-thumb">PNG</span>
                            <span>
                              <strong>{record.eggId}</strong>
                              <small>{record.cover}</small>
                            </span>
                            <span className={`grade grade-${record.grade}`}>
                              {record.grade}
                            </span>
                          </div>
                        </td>
                        <td>
                          <strong>{record.quantity} 枚</strong>
                        </td>
                        <td>
                          <span
                            className={`source-pill ${record.source === "活动领取" ? "activity" : "admin"}`}
                          >
                            {record.source}
                          </span>
                          <small className="block muted">
                            {record.sourceDetail}
                          </small>
                        </td>
                        <td className="muted">{record.acquiredAt}</td>
                        <td>{record.operator}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state compact-empty">
                <strong>没有符合条件的获得记录</strong>
                <p>请调整关键词或获得方式后重新查询。</p>
                <button className="btn" onClick={resetRecordFilters}>
                  重置筛选
                </button>
              </div>
            )}

            <footer className="pagination">
              <span>第 1 页，共 1 页</span>
              <div>
                <button className="btn" disabled>
                  上一页
                </button>
                <button className="page-current">1</button>
                <button className="btn" disabled>
                  下一页
                </button>
              </div>
            </footer>
          </div>
        )}
      </section>

      {confirmOpen && (
        <>
          <div className="confirm-mask" onClick={() => setConfirmOpen(false)} />
          <section
            className="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="确认发送宠物蛋"
          >
            <h3>确认发送宠物蛋</h3>
            <p>请确认用户与宠物蛋信息，发送后将立即进入用户背包。</p>
            <dl className="confirm-summary">
              <div>
                <dt>用户ID</dt>
                <dd>{userId.trim()}</dd>
              </div>
              <div>
                <dt>宠物蛋</dt>
                <dd>
                  {selectedEgg.id} · {selectedEgg.grade} 级
                </dd>
              </div>
              <div>
                <dt>数量</dt>
                <dd>{quantity} 枚</dd>
              </div>
              {remark.trim() && (
                <div>
                  <dt>备注</dt>
                  <dd>{remark.trim()}</dd>
                </div>
              )}
            </dl>
            <div className="confirm-actions">
              <button className="btn" onClick={() => setConfirmOpen(false)}>
                取消
              </button>
              <button className="btn primary" onClick={confirmSend}>
                确认发送
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
}

function RechargeActivityDrawer({
  activity,
  mode,
  existingKeys,
  onClose,
  onSaved,
}) {
  const [activityKey, setActivityKey] = useState(activity?.key || "");
  const [name, setName] = useState(activity?.name || "");
  const [tiers, setTiers] = useState(() => {
    const source = activity?.tiers?.length
      ? activity.tiers
      : [{ id: "TIER-01", threshold: "", rewards: [] }];
    return source.map((tier) => ({
      ...tier,
      rewards: tier.rewards.map((reward) => ({ ...reward })),
      draftEggId: eggs[0].id,
      draftQuantity: 1,
    }));
  });
  const [error, setError] = useState("");

  const updateTier = (tierId, changes) => {
    setTiers((current) =>
      current.map((tier) =>
        tier.id === tierId ? { ...tier, ...changes } : tier,
      ),
    );
  };

  const addTier = () => {
    setTiers((current) => {
      const lastThreshold = Number(current.at(-1)?.threshold) || 0;
      const nextIndex = current.length + 1;
      return [
        ...current,
        {
          id: `TIER-${String(nextIndex).padStart(2, "0")}-${Date.now()}`,
          threshold: lastThreshold ? lastThreshold + 500 : "",
          rewards: [],
          draftEggId: eggs[0].id,
          draftQuantity: 1,
        },
      ];
    });
  };

  const removeTier = (tierId) => {
    setTiers((current) => current.filter((tier) => tier.id !== tierId));
  };

  const addEggReward = (tierId) => {
    const targetTier = tiers.find((tier) => tier.id === tierId);
    const quantity = Number(targetTier?.draftQuantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      setError("宠物蛋数量需为 1–99 的整数");
      return;
    }
    setTiers((current) =>
      current.map((tier) => {
        if (tier.id !== tierId) return tier;
        const existingReward = tier.rewards.find(
          (reward) => reward.eggId === tier.draftEggId,
        );
        const rewards = existingReward
          ? tier.rewards.map((reward) =>
              reward.eggId === tier.draftEggId
                ? { ...reward, quantity: reward.quantity + quantity }
                : reward,
            )
          : [
              ...tier.rewards,
              { eggId: tier.draftEggId, quantity },
            ];
        return { ...tier, rewards, draftQuantity: 1 };
      }),
    );
    setError("");
  };

  const removeEggReward = (tierId, eggId) => {
    setTiers((current) =>
      current.map((tier) =>
        tier.id === tierId
          ? {
              ...tier,
              rewards: tier.rewards.filter((reward) => reward.eggId !== eggId),
            }
          : tier,
      ),
    );
  };

  const save = () => {
    const normalizedKey = activityKey.trim().toUpperCase();
    if (!normalizedKey || !/^[A-Z0-9_]+$/.test(normalizedKey)) {
      setError("活动 Key 仅支持大写字母、数字和下划线");
      return;
    }
    if (mode === "create" && existingKeys.includes(normalizedKey)) {
      setError("活动 Key 已存在，请更换后保存");
      return;
    }
    if (!name.trim()) {
      setError("请填写活动名称");
      return;
    }
    if (!tiers.length) {
      setError("请至少添加一个充值阶梯");
      return;
    }
    const thresholds = tiers.map((tier) => Number(tier.threshold));
    if (thresholds.some((threshold) => !threshold || threshold <= 0)) {
      setError("请填写大于 0 的累计充值门槛");
      return;
    }
    if (thresholds.some((threshold, index) => index && threshold <= thresholds[index - 1])) {
      setError("充值门槛需按阶梯严格递增");
      return;
    }
    if (tiers.some((tier) => !tier.rewards.length)) {
      setError("每个充值阶梯至少添加一个宠物蛋奖励");
      return;
    }

    onSaved({
      key: normalizedKey,
      name: name.trim(),
      tiers: tiers.map(({ id, threshold, rewards }) => ({
        id,
        threshold: Number(threshold),
        rewards,
      })),
      updated: "2026-08-11 刚刚",
    });
  };

  return (
    <>
      <div className="mask" onClick={onClose} />
      <aside className="drawer activity-drawer" aria-label="充值活动配置抽屉">
        <header className="drawer-head">
          <div>
            <p className="eyebrow">
              {mode === "create" ? "NEW RECHARGE ACTIVITY" : activity.key}
            </p>
            <h2>{mode === "create" ? "新建充值活动" : `编辑 ${activity.name}`}</h2>
            <p>配置活动识别 Key、充值阶梯和宠物蛋奖励。</p>
          </div>
          <button className="text-btn" onClick={onClose}>关闭</button>
        </header>

        <div className="drawer-body">
          <section className="form-section">
            <div className="section-title">
              <h3>基础信息</h3>
              <p>活动 Key 用于客户端和服务端识别，创建后不可修改。</p>
            </div>
            <div className="activity-form-grid">
              <div className="field">
                <label htmlFor="activity-key">活动 Key *</label>
                <input
                  id="activity-key"
                  value={activityKey}
                  disabled={mode === "edit"}
                  onChange={(event) => setActivityKey(event.target.value.toUpperCase())}
                  placeholder="例如 PET_RECHARGE_MONTHLY"
                />
                <small>仅支持大写字母、数字和下划线，保存后不可修改。</small>
              </div>
              <div className="field">
                <label htmlFor="activity-name">活动名称 *</label>
                <input
                  id="activity-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="请输入后台活动名称"
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="section-title section-title-action">
              <div>
                <h3>充值阶梯</h3>
                <p>门槛按每月累计充值金额计算，阶梯金额必须依次递增。</p>
              </div>
              <button className="btn primary" onClick={addTier}>添加阶梯</button>
            </div>

            <div className="activity-tier-list">
              {tiers.map((tier, index) => (
                <article className="activity-tier-card" key={tier.id}>
                  <div className="activity-tier-head">
                    <div>
                      <span className="tier-number">{index + 1}</span>
                      <strong>充值阶梯 {index + 1}</strong>
                    </div>
                    <button
                      className="remove-btn"
                      disabled={tiers.length === 1}
                      onClick={() => removeTier(tier.id)}
                    >
                      移除阶梯
                    </button>
                  </div>

                  <div className="tier-threshold-row">
                    <div className="field">
                      <label htmlFor={`tier-threshold-${tier.id}`}>累计充值门槛（美元）*</label>
                      <input
                        id={`tier-threshold-${tier.id}`}
                        type="number"
                        min="1"
                        value={tier.threshold}
                        onChange={(event) =>
                          updateTier(tier.id, { threshold: event.target.value })
                        }
                        placeholder="请输入金额"
                      />
                    </div>
                    <div className="tier-preview">
                      客户端展示：累计充值 ${Number(tier.threshold || 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="tier-reward-section">
                    <div className="tier-reward-title">
                      <strong>宠物蛋奖励</strong>
                      <span>从宠物蛋配置中选择，可添加多个奖励。</span>
                    </div>
                    {tier.rewards.length ? (
                      <div className="activity-reward-list">
                        {tier.rewards.map((reward) => {
                          const egg = eggs.find((item) => item.id === reward.eggId);
                          return (
                            <div className="activity-reward-row" key={reward.eggId}>
                              <span className="file-thumb">PNG</span>
                              <span className="activity-reward-main">
                                <strong>{egg?.id}</strong>
                                <small>{egg?.cover}</small>
                              </span>
                              <span className={`grade grade-${egg?.grade}`}>
                                {egg?.grade}
                              </span>
                              <strong>×{reward.quantity}</strong>
                              <button
                                className="remove-btn"
                                onClick={() => removeEggReward(tier.id, reward.eggId)}
                              >
                                移除
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="tier-reward-empty">暂未添加宠物蛋奖励</div>
                    )}

                    <div className="reward-add-row">
                      <div className="field">
                        <label htmlFor={`reward-egg-${tier.id}`}>宠物蛋配置</label>
                        <select
                          id={`reward-egg-${tier.id}`}
                          value={tier.draftEggId}
                          onChange={(event) =>
                            updateTier(tier.id, { draftEggId: event.target.value })
                          }
                        >
                          {eggs.map((egg) => (
                            <option value={egg.id} key={egg.id}>
                              {egg.id} · {egg.grade}级 · {egg.cover}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field reward-quantity-field">
                        <label htmlFor={`reward-quantity-${tier.id}`}>数量</label>
                        <input
                          id={`reward-quantity-${tier.id}`}
                          type="number"
                          min="1"
                          max="99"
                          value={tier.draftQuantity}
                          onChange={(event) =>
                            updateTier(tier.id, { draftQuantity: event.target.value })
                          }
                        />
                      </div>
                      <button
                        className="btn"
                        onClick={() => addEggReward(tier.id)}
                      >
                        添加宠物蛋
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {error && <div className="form-error">{error}</div>}
        </div>

        <footer className="drawer-foot">
          <span>保存后客户端将按活动 Key 读取最新阶梯与奖励配置</span>
          <div>
            <button className="btn" onClick={onClose}>取消</button>
            <button className="btn primary" onClick={save}>保存配置</button>
          </div>
        </footer>
      </aside>
    </>
  );
}

function RechargeActivityPage({ onNotify }) {
  const [activities, setActivities] = useState(initialRechargeActivities);
  const [keyword, setKeyword] = useState("");
  const [activityDrawer, setActivityDrawer] = useState(null);
  const filteredActivities = activities.filter((activity) =>
    `${activity.key}${activity.name}`
      .toLowerCase()
      .includes(keyword.toLowerCase()),
  );

  const saveActivity = (nextActivity) => {
    setActivities((current) => {
      const exists = current.some((item) => item.key === nextActivity.key);
      return exists
        ? current.map((item) =>
            item.key === nextActivity.key ? nextActivity : item,
          )
        : [nextActivity, ...current];
    });
    setActivityDrawer(null);
    onNotify(
      activityDrawer?.mode === "create"
        ? "充值活动已创建"
        : "充值活动配置已保存",
    );
  };

  return (
    <>
      <section className="panel activity-panel">
        <div className="panel-head">
          <div>
            <h2>充值活动列表</h2>
            <p>支持通过唯一活动 Key 配置多个充值活动及其阶梯宠物蛋奖励。</p>
          </div>
          <button
            className="btn primary"
            onClick={() => setActivityDrawer({ mode: "create", item: null })}
          >
            新建充值活动
          </button>
        </div>

        <div className="activity-filters">
          <div className="field search-field">
            <label htmlFor="activity-keyword">关键词</label>
            <input
              id="activity-keyword"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜索活动 Key / 活动名称"
            />
          </div>
          <div className="filter-actions">
            <button className="btn" onClick={() => setKeyword("")}>重置</button>
            <button className="btn primary">查询</button>
          </div>
        </div>

        {filteredActivities.length ? (
          <div className="table-wrap">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>活动 Key</th>
                  <th>活动名称</th>
                  <th>充值阶梯</th>
                  <th>宠物蛋奖励</th>
                  <th>更新时间</th>
                  <th className="action-col">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity) => {
                  const rewardCount = activity.tiers.reduce(
                    (total, tier) =>
                      total + tier.rewards.reduce((sum, reward) => sum + reward.quantity, 0),
                    0,
                  );
                  return (
                    <tr key={activity.key}>
                      <td className="activity-key-cell">{activity.key}</td>
                      <td><strong>{activity.name}</strong></td>
                      <td>
                        <strong>{activity.tiers.length} 个</strong>
                        <small className="block muted">
                          {activity.tiers.map((tier) => `$${tier.threshold.toLocaleString()}`).join(" / ")}
                        </small>
                      </td>
                      <td><strong>{rewardCount} 枚</strong></td>
                      <td className="muted">{activity.updated}</td>
                      <td>
                        <button
                          className="link-btn"
                          onClick={() =>
                            setActivityDrawer({ mode: "edit", item: activity })
                          }
                        >
                          编辑
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <strong>没有符合条件的充值活动</strong>
            <p>请调整关键词或新建充值活动。</p>
            <button className="btn" onClick={() => setKeyword("")}>重置筛选</button>
          </div>
        )}

        <footer className="pagination">
          <span>第 1 页，共 1 页</span>
          <div>
            <button className="btn" disabled>上一页</button>
            <button className="page-current">1</button>
            <button className="btn" disabled>下一页</button>
          </div>
        </footer>
      </section>

      {activityDrawer && (
        <RechargeActivityDrawer
          activity={activityDrawer.item}
          mode={activityDrawer.mode}
          existingKeys={activities.map((item) => item.key)}
          onClose={() => setActivityDrawer(null)}
          onSaved={saveActivity}
        />
      )}
    </>
  );
}

export function App() {
  const [module, setModule] = useState("pet");
  const [keyword, setKeyword] = useState("");
  const [grade, setGrade] = useState("全部");
  const [drawer, setDrawer] = useState(null);
  const [toast, setToast] = useState("");

  const moduleCopy = {
    pet: {
      title: "宠物配置",
      description: "管理宠物基础信息、多语言名称和三星形态资源。",
      listTitle: "宠物列表",
      listDescription: "支持按关键词和品级快速定位配置。",
      placeholder: "搜索宠物名称 / ID / 资源文件",
    },
    egg: {
      title: "宠物蛋配置",
      description: "管理静态蛋封面、孵化中动态资源、品级和关联宠物池。",
      listTitle: "宠物蛋列表",
      listDescription: "支持按关键词和品级快速定位配置。",
      placeholder: "搜索宠物蛋ID / 资源文件 / 关联宠物",
    },
    userPet: {
      title: "用户宠物",
      description: "查询每个用户拥有的宠物实例及当前携带状态。",
      listTitle: "用户宠物列表",
      listDescription: "同一用户可拥有重复宠物，通过用户宠物ID区分实例。",
      placeholder: "搜索用户ID / 昵称 / 宠物名称 / 用户宠物ID",
    },
    eggGrant: {
      title: "宠物蛋发送",
      description: "向指定用户的宠物蛋背包发送已配置的宠物蛋。",
      listTitle: "",
      listDescription: "",
      placeholder: "",
    },
    rechargeActivity: {
      title: "充值活动配置",
      description: "通过活动 Key 管理充值阶梯和宠物蛋奖励。",
      listTitle: "",
      listDescription: "",
      placeholder: "",
    },
  }[module];

  const activeRows =
    module === "pet"
      ? pets
      : module === "egg"
        ? eggs
        : module === "userPet"
          ? userPets
          : [];
  const filteredRows = useMemo(
    () =>
      activeRows.filter((item) => {
        const text =
          module === "pet"
            ? `${item.id}${item.name}${item.cover}`
            : module === "egg"
              ? `${item.id}${item.cover}${item.hatching}${item.pets}`
              : `${item.id}${item.userId}${item.nickname}${item.petId}${item.name}`;
        return (
          (!keyword || text.toLowerCase().includes(keyword.toLowerCase())) &&
          (grade === "全部" || item.grade === grade)
        );
      }),
    [activeRows, grade, keyword, module],
  );

  const notify = (message) => {
    setDrawer(null);
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const resetFilters = () => {
    setKeyword("");
    setGrade("全部");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span>Pet Admin</span>
        </div>
        <p className="nav-title">宠物运营后台</p>
        <button
          className={`nav-item ${module === "pet" ? "active" : ""}`}
          onClick={() => {
            setModule("pet");
            resetFilters();
          }}
        >
          宠物配置
        </button>
        <button
          className={`nav-item ${module === "egg" ? "active" : ""}`}
          onClick={() => {
            setModule("egg");
            resetFilters();
          }}
        >
          宠物蛋配置
        </button>
        <button
          className={`nav-item ${module === "userPet" ? "active" : ""}`}
          onClick={() => {
            setModule("userPet");
            resetFilters();
          }}
        >
          用户宠物
        </button>
        <button
          className={`nav-item ${module === "eggGrant" ? "active" : ""}`}
          onClick={() => {
            setModule("eggGrant");
            resetFilters();
          }}
        >
          宠物蛋发送
        </button>
        <button
          className={`nav-item ${module === "rechargeActivity" ? "active" : ""}`}
          onClick={() => {
            setModule("rechargeActivity");
            resetFilters();
          }}
        >
          充值活动配置
        </button>
        <div className="sidebar-foot">
          <span>生产环境</span>
          <strong>运营管理员</strong>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{moduleCopy.title}</h1>
            <p>{moduleCopy.description}</p>
          </div>
          {(module === "pet" || module === "egg") && (
            <div className="top-actions">
              <button
                className="btn primary"
                onClick={() =>
                  setDrawer({
                    type: module,
                    mode: "create",
                    item: null,
                  })
                }
              >
                {module === "pet" ? "新建宠物" : "新建宠物蛋"}
              </button>
            </div>
          )}
        </header>

        <div className="content">
          {module === "eggGrant" ? (
            <EggGrantPage onSent={notify} />
          ) : module === "rechargeActivity" ? (
            <RechargeActivityPage onNotify={notify} />
          ) : (
            <section className="panel">
            <div className="panel-head">
              <div>
                <h2>{moduleCopy.listTitle}</h2>
                <p>{moduleCopy.listDescription}</p>
              </div>
              <span className="total">共 {filteredRows.length} 条</span>
            </div>

            <div className="filters">
              <div className="field search-field">
                <label htmlFor="keyword">关键词</label>
                <input
                  id="keyword"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder={moduleCopy.placeholder}
                />
              </div>
              <div className="field">
                <label htmlFor="grade-filter">品级</label>
                <select
                  id="grade-filter"
                  value={grade}
                  onChange={(event) => setGrade(event.target.value)}
                >
                  <option>全部</option>
                  <option>A</option>
                  <option>S</option>
                  <option>SS</option>
                  <option>SSS</option>
                </select>
              </div>
              <div className="filter-actions">
                <button className="btn" onClick={resetFilters}>
                  重置
                </button>
                <button className="btn primary">查询</button>
              </div>
            </div>

            {filteredRows.length ? (
              <div className="table-wrap">
                {module === "pet" ? (
                  <table className="pet-table">
                    <thead>
                      <tr>
                        <th>宠物ID</th>
                        <th>宠物</th>
                        <th>品级</th>
                        <th>更新时间</th>
                        <th className="action-col">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((item) => (
                        <tr key={item.id}>
                          <td className="id-cell">{item.id}</td>
                          <td>
                            <div className="object-cell">
                              <span className="file-thumb">
                                {item.cover.toLowerCase().endsWith(".png")
                                  ? "PNG"
                                  : "WEBP"}
                              </span>
                              <span>
                                <strong>{item.name}</strong>
                                <small>{item.cover}</small>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`grade grade-${item.grade}`}>
                              {item.grade}
                            </span>
                          </td>
                          <td className="muted">{item.updated}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                className="link-btn"
                                onClick={() =>
                                  setDrawer({
                                    type: "pet",
                                    mode: "edit",
                                    item,
                                  })
                                }
                              >
                                编辑
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : module === "egg" ? (
                  <table className="egg-table">
                    <thead>
                      <tr>
                        <th>宠物蛋ID</th>
                        <th>宠物蛋封面</th>
                        <th>品级</th>
                        <th>关联宠物</th>
                        <th>更新时间</th>
                        <th className="action-col">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((item) => (
                        <tr key={item.id}>
                          <td className="id-cell">{item.id}</td>
                          <td>
                            <div className="object-cell">
                              <span className="file-thumb">PNG</span>
                              <span>
                                <strong>{item.cover}</strong>
                                <small>宠物蛋封面资源</small>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`grade grade-${item.grade}`}>
                              {item.grade}
                            </span>
                          </td>
                          <td>
                            <strong>{item.petCount} 个</strong>
                            <small className="block muted">{item.pets}</small>
                          </td>
                          <td className="muted">{item.updated}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                className="link-btn"
                                onClick={() =>
                                  setDrawer({
                                    type: "egg",
                                    mode: "edit",
                                    item,
                                  })
                                }
                              >
                                编辑
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="user-pet-table">
                    <thead>
                      <tr>
                        <th>用户</th>
                        <th>用户宠物ID</th>
                        <th>宠物</th>
                        <th>品级</th>
                        <th>成长</th>
                        <th>携带状态</th>
                        <th>更新时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.nickname}</strong>
                            <small className="block muted">
                              用户ID {item.userId}
                            </small>
                          </td>
                          <td className="id-cell">{item.id}</td>
                          <td>
                            <strong>{item.name}</strong>
                            <small className="block muted">{item.petId}</small>
                          </td>
                          <td>
                            <span className={`grade grade-${item.grade}`}>
                              {item.grade}
                            </span>
                          </td>
                          <td>
                            <strong>{item.star} 星形态</strong>
                            <small className="block muted">
                              Lv.{item.level} · {item.experience.toLocaleString()} /
                              {item.nextExperience.toLocaleString()}
                            </small>
                          </td>
                          <td>
                            <span
                              className={`state-pill ${item.carried ? "on" : "off"}`}
                            >
                              {item.carried ? "已携带" : "未携带"}
                            </span>
                          </td>
                          <td className="muted">{item.updated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <strong>没有符合条件的配置</strong>
                <p>请调整筛选条件，或重置后查看全部数据。</p>
                <button className="btn" onClick={resetFilters}>
                  重置筛选
                </button>
              </div>
            )}

            <footer className="pagination">
              <span>第 1 页，共 1 页</span>
              <div>
                <button className="btn" disabled>
                  上一页
                </button>
                <button className="page-current">1</button>
                <button className="btn" disabled>
                  下一页
                </button>
              </div>
            </footer>
            </section>
          )}
        </div>
      </main>

      {drawer?.type === "pet" && (
        <PetDrawer
          mode={drawer.mode}
          pet={drawer.item}
          onClose={() => setDrawer(null)}
          onSaved={notify}
        />
      )}
      {drawer?.type === "egg" && (
        <EggDrawer
          mode={drawer.mode}
          egg={drawer.item}
          onClose={() => setDrawer(null)}
          onSaved={notify}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
